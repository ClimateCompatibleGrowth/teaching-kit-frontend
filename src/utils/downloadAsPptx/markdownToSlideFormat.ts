import { marked } from 'marked'
import { decode } from 'html-entities'
import PptxGenJS from 'pptxgenjs'

import { sourceIsFromS3 } from '../utils'
import { Slide } from '../../types'
import { slideHeading } from '../createPptx/pptxConfiguration/slideElements'
import { PptxSlide } from '../../types/pptx'
import {
  getFallbackContentStyling,
  getPrimaryContentStyling,
  getSecondaryContentStyling,
  ListStyle,
} from '../createPptx/pptxConfiguration/mainContent'
import {
  h1Style,
  h2Style,
  h3Style,
  paragraphStyle,
} from '../createPptx/pptxConfiguration/text'

const textNodeTypes = ['paragraph', 'list', 'space']

const nodeTypes = [
  'paragraph',
  'list',
  'space',
  'heading',
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

const findImageToken = (token: marked.Token): token is marked.Tokens.Image =>
  token.type === 'image'

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
  nodeTypes: NodeType[],
  slideHasImage: boolean
): PptxGenJS.TextPropsOptions => {
  const isText = isTextElement(node.type)
  const preceedingTextElements = nodeTypes
    .slice(0, index)
    .filter((nodeType) => isTextElement(nodeType))
  const preceedingTextElementsOfUniqueType = [
    ...new Set(preceedingTextElements),
  ].filter((element) => element !== 'space')
  const listProps = getListProps(node)

  if (isText) {
    switch (preceedingTextElementsOfUniqueType.length) {
      case 0:
        return getPrimaryContentStyling(listProps)
      case 1:
        return getSecondaryContentStyling(listProps, slideHasImage)
    }
  }

  return getFallbackContentStyling(listProps)
}

type TextNodeType = 'paragraph' | 'h1' | 'h2' | 'h3' | 'space'

const convertToTextProp = (
  text: string,
  type: TextNodeType
): PptxGenJS.TextProps => {
  return {
    text,
    options: getTextStyling(type),
  }
}

const getTextStyling = (type: TextNodeType): PptxGenJS.TextPropsOptions => {
  switch (type) {
    case 'paragraph':
      return paragraphStyle
    case 'h1':
      return h1Style
    case 'h2':
      return h2Style
    case 'h3':
      return h3Style
    case 'space':
      return {}
    default:
      return {}
  }
}

const markdownToSlideFormat = (slide: Slide) => {
  const pptxSlide = Object.values(slide).reduce(
    (finalSlide, slideValue, index) => {
      const slideAttribute = {} as PptxSlide
      const mainSlideContent = [] as PptxGenJS.TextProps[]

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
      const slideHasImage =
        markdown.find(
          (node) =>
            node.type === 'paragraph' &&
            node.tokens.find(findImageToken) !== undefined
        ) !== undefined

      for (const [index, node] of markdown.entries()) {
        if (node.type === 'paragraph') {
          const imageToken = node.tokens.find(findImageToken)

          if (imageToken !== undefined && sourceIsFromS3(imageToken.href)) {
            slideAttribute.image = imageToken.href
          }

          const paragraphTokens = node.tokens.filter(
            (token): token is marked.Tokens.Text => token.type === 'text'
          )

          for (const paragraphToken of paragraphTokens) {
            const textProps = convertToTextProp(
              `${decode(paragraphToken.text)}`,
              'paragraph'
            )
            mainSlideContent.push(textProps)
            if (slideAttribute.mainContentStyling === undefined) {
              const styling = getDynamicStyling(
                node,
                index,
                nodeTypesInOrderOfOccurance,
                slideHasImage
              )
              slideAttribute.mainContentStyling = styling
            }
          }
        }

        if (node.type === 'space') {
          const textProps = convertToTextProp(node.raw, 'space')
          mainSlideContent.push(textProps)
        }

        if (node.type === 'heading') {
          if (node.depth === 1) {
            const textProps = convertToTextProp(`${decode(node.text)}`, 'h1')
            mainSlideContent.push(textProps)
          }
          if (node.depth === 2) {
            const textProps = convertToTextProp(`${decode(node.text)}`, 'h2')
            mainSlideContent.push(textProps)
          }
          if (node.depth === 3) {
            const textProps = convertToTextProp(`${decode(node.text)}`, 'h3')
            mainSlideContent.push(textProps)
          }
        }

        if (node.type === 'list') {
          slideAttribute.list = node.items
          const styling = getDynamicStyling(
            node,
            index,
            nodeTypesInOrderOfOccurance,
            slideHasImage
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
