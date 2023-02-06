import { marked } from 'marked'
import { decode } from 'html-entities'
import PptxGenJS from 'pptxgenjs'

import { getImageMetadata, sourceIsFromS3, stripBackslashN } from '../utils'
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
import { getBaseImageStyling } from '../createPptx/pptxConfiguration/image'

type TokenWithoutTextField =
  | marked.Tokens.Space
  | marked.Tokens.Table
  | marked.Tokens.Hr
  | marked.Tokens.List
  | marked.Tokens.Def
  | marked.Tokens.Br

const textNodeTypes = ['paragraph', 'heading', 'list', 'space']

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

type AllTokensButSpace = Exclude<marked.Token, TokenWithoutTextField>
const findAllTokensWithTextField = (
  tokens: marked.Token[]
): AllTokensButSpace[] =>
  tokens.filter((token): token is AllTokensButSpace => 'text' in token)

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

const markdownToSlideFormat = async (slide: Slide): Promise<PptxSlide> => {
  let slideTitle = ''

  const pptxSlidePromise = Object.values(slide).reduce(
    async (finalSlide, slideValue, index) => {
      const slideAttribute = {} as PptxSlide
      const mainSlideContent = [] as PptxGenJS.TextProps[]
      const images = [] as PptxGenJS.ImageProps[]

      // Ignore id (first index) and speaker notes (last index)
      if (index === 0 || index === Object.values(slide).length - 1) {
        return Promise.resolve(finalSlide)
      }

      // Slide title
      if (index === 1) {
        slideTitle = slideValue ?? ''
        return Promise.resolve(finalSlide)
      }

      const markdown = marked.lexer(slideValue)

      const nodeTypesInOrderOfOccurance = markdown.map((node) => {
        if (
          node.type === 'paragraph' &&
          node.tokens.map((token) => token.type).includes('image')
        ) {
          return 'image'
        }
        return node.type
      })
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
            const href = `${imageToken.href}?do-not-fetch-from-cache`
            const image = await getImageMetadata(href)
            const imageStyling = getBaseImageStyling(
              image.naturalWidth,
              image.naturalHeight
            )
            images.push({
              path: href,
              altText: imageToken.text,
              ...imageStyling,
            })
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
            slideAttribute.mainContentStyling = addContentStyling(
              slideAttribute.mainContentStyling,
              node,
              index,
              nodeTypesInOrderOfOccurance,
              slideHasImage
            )
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
            slideAttribute.mainContentStyling = addContentStyling(
              slideAttribute.mainContentStyling,
              node,
              index,
              nodeTypesInOrderOfOccurance,
              slideHasImage
            )
          }
          if (node.depth === 2) {
            const textProps = convertToTextProp(`${decode(node.text)}`, 'h2')
            mainSlideContent.push(textProps)
            slideAttribute.mainContentStyling = addContentStyling(
              slideAttribute.mainContentStyling,
              node,
              index,
              nodeTypesInOrderOfOccurance,
              slideHasImage
            )
          }
          if (node.depth === 3) {
            const textProps = convertToTextProp(`${decode(node.text)}`, 'h3')
            mainSlideContent.push(textProps)
            slideAttribute.mainContentStyling = addContentStyling(
              slideAttribute.mainContentStyling,
              node,
              index,
              nodeTypesInOrderOfOccurance,
              slideHasImage
            )
          }
        }

        if (node.type === 'list') {
          slideAttribute.list = getSubComponentsFromList(node.items)
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
      slideAttribute.images = images

      return Promise.resolve({
        ...finalSlide,
        ...slideAttribute,
      })
    },
    {} as Promise<PptxSlide>
  )

  const pptxSlide = await pptxSlidePromise

  if (slide) {
    pptxSlide.speakerNotes = slide.SpeakerNotes
  }

  pptxSlide.heading = slideTitle ?? ''
  pptxSlide.headingStyling = slideHeading
  pptxSlide.title = slideTitle ?? ''

  return pptxSlide
}

const addContentStyling = (
  contentStyling: PptxGenJS.TextPropsOptions | undefined,
  node: marked.Token,
  index: number,
  nodeTypesInOrderOfOccurance: NodeType[],
  slideHasImage: boolean
) => {
  if (contentStyling !== undefined) {
    return contentStyling
  }
  const styling = getDynamicStyling(
    node,
    index,
    nodeTypesInOrderOfOccurance,
    slideHasImage
  )
  return styling
}

// Extremely cumbersome way of adding bold items to list without breaking to new bullet.
const getSubComponentsFromList = (
  list: marked.Tokens.ListItem[]
): PptxGenJS.TextProps[] => {
  return list.reduce((finalList, listItem) => {
    let textNodesToAdd = [] as PptxGenJS.TextProps[]
    for (const token of listItem.tokens) {
      if (token.type === 'text') {
        const _token = token as marked.Tokens.Text
        if (_token.tokens === undefined) {
          textNodesToAdd.push({ text: stripBackslashN(_token.text) })
        } else {
          const innerTokens = findAllTokensWithTextField(_token.tokens)
          const textNodes = innerTokens.map((innerToken, index) => ({
            text: stripBackslashN(innerToken.text),
            options: {
              bold: innerToken.type === 'strong',
              italic: innerToken.type === 'em',
              ...(index === 0 && { indentLevel: 0, bullet: true }),
            },
          }))
          textNodesToAdd = [...textNodesToAdd, ...textNodes]
        }
      }
    }
    return [...finalList, ...textNodesToAdd]
  }, [] as PptxGenJS.TextProps[])
}

export default markdownToSlideFormat
