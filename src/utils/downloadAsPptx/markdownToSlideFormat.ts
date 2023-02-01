import { marked } from 'marked'
import { decode } from 'html-entities'
import PptxGenJS from 'pptxgenjs'

import { sourceIsFromS3 } from '../utils'
import { Slide } from '../../types'
import {
  h1Heading,
  h2Heading,
  h3Heading,
  slideHeading,
} from '../createPptx/pptxConfiguration/slideElements'
import { PptxSlide } from '../../types/pptx'
import {
  getFallbackContentStyling,
  getPrimaryContentStyling,
  getSecondaryContentStyling,
  ListStyle,
} from '../createPptx/pptxConfiguration/textContent'

const textNodeTypes = ['paragraph', 'list']
const nodeTypes = [
  ...textNodeTypes,
  'heading',
  'space',
  'code',
  'table',
  'hr',
  'blockquote',
  'list_item',
  'html',
  'text',
  'def',
  'escape',
  'image',
  'link',
  'strong',
  'em',
  'codespan',
  'br',
  'del',
] as const
type NodeType = typeof nodeTypes[number]

const isTextElement = (type: NodeType) => textNodeTypes.includes(type)

const getListProps = (node: marked.Token): ListStyle | undefined => {
  if (node.type === 'list') {
    if (node.ordered) {
      return 'ORDERED'
    }
    return 'UNORDERED'
  }
  return undefined
}

const getDynamicStyling = (
  node: marked.Token,
  index: number,
  nodeTypes: NodeType[]
): PptxGenJS.TextPropsOptions => {
  const isText = isTextElement(node.type)
  const preceedingTextElements = nodeTypes
    .slice(0, index)
    .filter((nodeType) => isTextElement(nodeType))
  const preceedingTextElementsOfUniqueType = [
    ...new Set(preceedingTextElements),
  ]
  const listProps = getListProps(node)

  if (isText) {
    switch (preceedingTextElementsOfUniqueType.length) {
      case 0:
        return getPrimaryContentStyling(listProps)
      case 1:
        return getSecondaryContentStyling(listProps)
    }
  }

  return getFallbackContentStyling(listProps)
}

const markdownToSlideFormat = (slide: Slide) => {
  const pptxSlide = Object.values(slide).reduce(
    (finalSlide, slideValue, index) => {
      const slideAttribute = {} as PptxSlide
      const mainSlideContent = []

      // Ignore id (first index) and speaker notes (last index)
      if (index === 0 || index === Object.values(slide).length - 1) {
        return finalSlide
      }

      // Slide title
      if (index === 1) {
        slideAttribute.heading = slideValue ?? ''
        slideAttribute.headingStyling = slideHeading
        slideAttribute.title = slideValue ?? ''
        return {
          ...finalSlide,
          ...slideAttribute,
        }
      }

      const markdown = marked.lexer(slideValue)

      const nodeTypesInOrderOfOccurance = markdown.map((node) => node.type)

      for (const [index, node] of markdown.entries()) {
        if (node.type === 'paragraph') {
          const imageToken = node.tokens.find(
            (token): token is marked.Tokens.Image => token.type === 'image'
          )

          if (imageToken !== undefined && sourceIsFromS3(imageToken.href)) {
            slideAttribute.image = imageToken.href
          }

          const paragraphTokens = node.tokens.filter(
            (token): token is marked.Tokens.Text => token.type === 'text'
          )

          for (const paragraphToken of paragraphTokens) {
            mainSlideContent.push(`${decode(paragraphToken.text)}`)
            if (slideAttribute.mainContentStyling === undefined) {
              const styling = getDynamicStyling(
                node,
                index,
                nodeTypesInOrderOfOccurance
              )
              slideAttribute.mainContentStyling = styling
            }
          }
        }

        if (node.type === 'space') {
          mainSlideContent.push(node.raw)
        }

        if (node.type === 'heading') {
          if (node.depth === 1) {
            slideAttribute.heading = decode(node.text)
            slideAttribute.headingStyling = h1Heading
          }
          if (node.depth === 2) {
            slideAttribute.heading = decode(node.text)
            slideAttribute.headingStyling = h2Heading
          }
          if (node.depth === 3) {
            slideAttribute.heading = decode(node.text)
            slideAttribute.headingStyling = h3Heading
          }
        }

        if (node.type === 'list') {
          slideAttribute.list = node.items
          const styling = getDynamicStyling(
            node,
            index,
            nodeTypesInOrderOfOccurance
          )
          slideAttribute.listStyling = styling
        }
      }

      slideAttribute.mainContent = mainSlideContent

      return {
        ...finalSlide,
        ...slideAttribute,
      }
    },
    {} as PptxSlide
  )

  if (slide) {
    pptxSlide.speakerNotes = slide.SpeakerNotes
  }

  return pptxSlide
}

export default markdownToSlideFormat
