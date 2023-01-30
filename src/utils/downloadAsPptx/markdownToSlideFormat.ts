import { Slide } from '../../types'

import {
  h1Heading,
  bulletPoints,
  mainContentStyling,
  h2Heading,
  h3Heading,
} from '../createPptx/pptxConfigurations'
import { PptxSlide } from '../../types/pptx'
import { marked } from 'marked'
import { decode } from 'html-entities'

const markdownToSlideFormat = (slide: Slide) => {
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
      slideAttribute.title = slide.Title

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
