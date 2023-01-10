import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
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
import { MarkdownLinkNode } from '@contentful/rich-text-from-markdown/dist/types/types'
import { PptxSlide } from '../types/pptx'

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
  const promises = slidesArray.map((slide: Slide, index: number) => {
    slide.id = slide.id.toString()
    return slideSchemaToPptxFormat(slide, slidesArray, index)
  })

  const pptxSlides: PptxSlide[] = await Promise.all(promises)
  return pptxSlides
}

const slideSchemaToPptxFormat = async (
  slide: Slide,
  slidesArray: Slide[],
  index: number
) => {
  let pptxSlide: PptxSlide = {} as PptxSlide
  let mainContentArray: string[] = []
  let imageUrl = ''

  const promises = Object.values(slide).map(async (value: string) => {
    // The result from richTextFromMarkdown does not reflect the same package's styling - therefore the 'any'
    const document: any = await richTextFromMarkdown(value, (_node) => {
      const node = _node as MarkdownLinkNode

      if (node.type === 'image' && node.url) {
        Promise.resolve({
          nodeType: 'embedded-[asset]',
          content: [node.url],
          data: {
            target: {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: '',
              },
            },
          },
        })
        imageUrl = node.url
      }
      return Promise.resolve({
        nodeType: '',
        content: [],
        data: {
          target: {
            sys: {
              type: '',
              linkType: '',
              id: '',
            },
          },
        },
      })
    })

    if (document.content.length >= 2) {
      for (let i = 0; i < document.content.length; i++) {
        if (document.content[i].nodeType === 'heading-1') {
          pptxSlide.heading = document.content[i].content[0].value
          pptxSlide.headingStyling = h1Heading
        }
        if (document.content[i].nodeType === 'heading-2') {
          pptxSlide.heading = document.content[i].content[0].value
          pptxSlide.headingStyling = h2Heading
        }
        if (document.content[i].nodeType === 'heading-3') {
          pptxSlide.heading = document.content[i].content[0].value
          pptxSlide.headingStyling = h3Heading
        }

        if (document.content[i].nodeType === 'paragraph') {
          mainContentArray.push(`\n \n ${document.content[i].content[0].value}`)
          pptxSlide.mainContent = mainContentArray
          pptxSlide.mainContentStyling = mainContentStyling
        }
        if (document.content[i].nodeType === 'unordered-list') {
          pptxSlide.list = document.content[i].content
          pptxSlide.bulletStyling = bulletPoints
        }
      }
    }

    if (
      document.content.length <= 1 &&
      document.content[0].nodeType.includes('heading')
    ) {
      pptxSlide.heading = document.content[0].content[0].value
      pptxSlide.headingStyling = singleHeading
      pptxSlide.mainContent = [''] // empty string to avoid undefined error. Will work for now.
    }
    pptxSlide.image = imageUrl

    pptxSlide.heading ? pptxSlide.heading : (pptxSlide.heading = '')
  })

  if (slidesArray) {
    pptxSlide.speakerNotes = slidesArray[index].SpeakerNotes
  }
  await Promise.all(promises)

  return pptxSlide
}

export default downloadAsPptx
