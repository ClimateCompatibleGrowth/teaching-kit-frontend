import { createPptxFile } from './createPptx/createPptx'
import { BlockOneLevelDeep, Data, Slide } from '../types'

import {
  h1Heading,
  bulletPoints,
  mainContentStyling,
  h2Heading,
  h3Heading,
  singleHeading,
} from './createPptx/createPptxStyling'
import { PptxSlide } from '../types/pptx'
import { marked } from 'marked'
import { decode } from 'html-entities'

const downloadAsPptx = async (block: Data<BlockOneLevelDeep>) => {
  const blockData = {
    Title: block.attributes.Title,
    slides: block.attributes.Slides,
  }

  const slidesArray: Slide[] = blockData.slides
  const blockTitle = blockData.Title

  const pptxSlides = await blockToPptxSlideFormat(slidesArray)

  createPptxFile(pptxSlides, blockTitle)
}

const blockToPptxSlideFormat = async (slidesArray: Slide[]) => {
  const pptxSlides = slidesArray.map((slide: Slide, index: number) => {
    slide.id = slide.id.toString()
    return slideSchemaToPptxFormat(slide, slidesArray, index)
  })

  return pptxSlides
}

const slideSchemaToPptxFormat = (
  slide: Slide,
  slidesArray: Slide[],
  index: number
) => {
  const pptxSlide = Object.values(slide).reduce(
    (finalSlide, slideValue, index) => {
      const slideAttribute = {} as PptxSlide
      const mainSlideContent = []

      // Ignore speaker notes
      if (index === Object.values(slide).length - 1) {
        return finalSlide
      }

      const markdown = marked.lexer(slideValue)

      for (const node of markdown) {
        if (node.type === 'paragraph') {
          const imageToken = node.tokens.find(
            (token): token is marked.Tokens.Image => token.type === 'image'
          )

          if (imageToken !== undefined) {
            slideAttribute.image = imageToken.href
          }

          const paragraphTokens = node.tokens.filter(
            (token): token is marked.Tokens.Text => token.type === 'text'
          )

          for (const paragraphToken of paragraphTokens) {
            mainSlideContent.push(`${decode(paragraphToken.text)}`)
            slideAttribute.mainContentStyling = mainContentStyling
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
          slideAttribute.bulletStyling = bulletPoints
        }
      }

      slideAttribute.mainContent = mainSlideContent
      slideAttribute.heading = slideAttribute.heading ?? ''

      return {
        ...finalSlide,
        ...slideAttribute,
      }
    },
    {} as PptxSlide
  )

  if (slidesArray) {
    pptxSlide.speakerNotes = slidesArray[index].SpeakerNotes
  }

  return pptxSlide
}

export default downloadAsPptx
