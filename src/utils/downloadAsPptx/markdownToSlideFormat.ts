import { marked } from 'marked'
import { decode } from 'html-entities'
import PptxGenJS from 'pptxgenjs'

import { getImageMetadata, sourceIsFromS3, stripBackslashN } from '../utils'
import { Modify, Slide } from '../../types'
import { getSlideHeading } from '../createPptx/pptxConfiguration/slideElements'
import { citeAsStyling } from '../createPptx/pptxConfiguration/slideElements'
import { PptxSlide } from '../../types/pptx'
import { getPrimaryContentStyling } from '../createPptx/pptxConfiguration/mainContent'
import {
  h1Style,
  h2Style,
  h3Style,
  italicStyle,
  listItemStyle,
  paragraphStyle,
  strongStyle,
  underlineStyle,
} from '../createPptx/pptxConfiguration/text'
import {
  Image,
  getImageDimensions,
  getImageStyling,
} from '../createPptx/pptxConfiguration/image'

type ExtendedParagraphToken = Modify<
  marked.Token,
  {
    type: marked.Token['type'] | 'underline'
  }
>
type UnderlineToken = {
  text: string
  raw: string
  type: 'underline'
}
type TokenWithoutTextField =
  | marked.Tokens.Space
  | marked.Tokens.Table
  | marked.Tokens.Hr
  | marked.Tokens.List
  | marked.Tokens.Def
  | marked.Tokens.Br
type AllTokensButSpace = Exclude<marked.Token, TokenWithoutTextField>
type TextNodeType =
  | 'paragraph'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'space'
  | 'text'
  | 'strong'
  | 'em'
  | 'underline'

const findImageToken = (token: marked.Token): token is marked.Tokens.Image =>
  token.type === 'image'

const findAllTokensWithTextField = (
  tokens: marked.Token[]
): AllTokensButSpace[] =>
  tokens.filter((token): token is AllTokensButSpace => 'text' in token)

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
    case 'text':
      return paragraphStyle
    case 'h1':
      return h1Style
    case 'h2':
      return h2Style
    case 'h3':
      return h3Style
    case 'strong':
      return strongStyle
    case 'em':
      return italicStyle
    case 'underline':
      return underlineStyle
    case 'space':
      return {}
    default:
      return {}
  }
}

const isKnownParagraphType = (
  token: marked.Token
): token is
  | marked.Tokens.Text
  | marked.Tokens.Strong
  | marked.Tokens.Em
  | marked.Tokens.HTML =>
  token.type === 'text' ||
  token.type === 'strong' ||
  token.type === 'em' ||
  token.type === 'html'

type RelevantParagraphToken =
  | marked.Tokens.Text
  | marked.Tokens.Strong
  | marked.Tokens.Em
  | UnderlineToken

const relevantParagraphNodes = ['text', 'strong', 'em', 'underline']

const tokenIsOfRelevantParagraphType = (
  token: ExtendedParagraphToken
): token is RelevantParagraphToken =>
  relevantParagraphNodes.includes(token.type)

const convertRelevantParagraphTokens = (
  tokens: marked.Token[]
): RelevantParagraphToken[] => {
  return tokens
    .reduce((convertedTokens, token, index) => {
      const lastToken = tokens[index - 1]
      const nextToken = tokens[index + 1]

      if (
        token.type === 'text' &&
        lastToken?.type === 'html' &&
        lastToken?.text === '<u>' &&
        nextToken?.type === 'html' &&
        nextToken?.text === '</u>'
      ) {
        return [
          ...convertedTokens,
          {
            text: token.text,
            raw: token.raw,
            type: 'underline',
          } as ExtendedParagraphToken,
        ]
      }
      if (!tokenIsOfRelevantParagraphType(token)) {
        return convertedTokens
      }
      return [...convertedTokens, token]
    }, [] as ExtendedParagraphToken[])
    .filter(tokenIsOfRelevantParagraphType)
}

const markdownToSlideFormat = async (
  slide: Slide,
  citeAs?: string
): Promise<PptxSlide> => {
  let slideTitle = ''

  const pptxSlidePromise = Object.values(slide).reduce(
    async (finalSlide, slideValue, index) => {
      const slideAttribute = {} as PptxSlide
      const mainSlideContent = [] as PptxGenJS.TextProps[]
      const images = [] as Image[]

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

      for (const [index, node] of markdown.entries()) {
        const style = slideAttribute.mainContentStyling
        if (node.type === 'paragraph') {
          const imageToken = node.tokens.find(findImageToken)

          if (imageToken !== undefined && sourceIsFromS3(imageToken.href)) {
            const href = `${imageToken.href}?do-not-fetch-from-cache`
            const image = await getImageMetadata(href)
            const imageDimensions = getImageDimensions(
              image.naturalWidth,
              image.naturalHeight
            )
            images.push({
              dimensions: imageDimensions,
              path: href,
              altText: imageToken.text,
            })
          }

          const paragraphTokens = node.tokens.filter(isKnownParagraphType)
          const relevantParagraphNodes =
            convertRelevantParagraphTokens(paragraphTokens)

          for (const paragraphToken of relevantParagraphNodes) {
            const textProps = convertToTextProp(
              `${decode(paragraphToken.text)}`,
              paragraphToken.type
            )
            mainSlideContent.push(textProps)
            slideAttribute.mainContentStyling = addContentStyling(style)
          }
        }

        if (node.type === 'space') {
          // Beware! The following logic might be tempting, but it screws up lists (and heading+lists)
          //
          // const textProps = convertToTextProp(node.raw, 'space')
          // mainSlideContent.push(textProps)
        }

        if (node.type === 'heading') {
          const newLine = index === 0 ? '' : '\n\n'
          if (node.depth === 1) {
            const textProps = convertToTextProp(
              `${newLine}${decode(node.text)}`,
              'h1'
            )
            mainSlideContent.push(textProps)
            slideAttribute.mainContentStyling = addContentStyling(style)
          }
          if (node.depth === 2) {
            const textProps = convertToTextProp(
              `${newLine}${decode(node.text)}`,
              'h2'
            )
            mainSlideContent.push(textProps)
            slideAttribute.mainContentStyling = addContentStyling(style)
          }
          if (node.depth === 3) {
            const textProps = convertToTextProp(
              `${newLine}${decode(node.text)}`,
              'h3'
            )
            mainSlideContent.push(textProps)
            slideAttribute.mainContentStyling = addContentStyling(style)
          }
        }

        if (node.type === 'list') {
          mainSlideContent.push(...getSubComponentsFromList(node.items))
          slideAttribute.mainContentStyling = addContentStyling(style)
        }

        if (node.type === 'table') {
          if (
            !slideAttribute.tables ||
            slideAttribute.tables.length === 0 ||
            !slideAttribute.tableStyling ||
            slideAttribute.tableStyling.length === 0
          ) {
            slideAttribute.tables = []
            slideAttribute.tableStyling = []
          }
          slideAttribute.tables.push([
            node.header.map((h) =>
              convertToTextProp(decode(h.text), 'paragraph')
            ),
            ...node.rows.map((row) =>
              row.map((c) => convertToTextProp(decode(c.text), 'paragraph'))
            ),
          ])
          slideAttribute.tableStyling.push({
            y: '25%',
            autoPage: true,
            colW: Math.max(10 / node.header.length),
            rowH: 0.5,
            border: { color: '#242424' },
          })
        }
      }

      slideAttribute.mainContent = mainSlideContent
      slideAttribute.images = getImageStyling(images)

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

  if (citeAs !== undefined) {
    pptxSlide.citeAs = citeAs
    pptxSlide.citeAsStyling = citeAsStyling
  }

  pptxSlide.heading = slideTitle ?? ''
  pptxSlide.headingStyling = getSlideHeading(
    pptxSlide.images !== undefined && pptxSlide.images.length > 0
  )
  pptxSlide.title = slideTitle ?? ''

  return pptxSlide
}

const addContentStyling = (
  contentStyling: PptxGenJS.TextPropsOptions | undefined
) => {
  if (contentStyling !== undefined) {
    return contentStyling
  }

  return getPrimaryContentStyling()
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
              ...listItemStyle,
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
