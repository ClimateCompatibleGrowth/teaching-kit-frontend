import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import { createPptxFile } from './createPptx/createPptx'
import { PptxSlide } from '../types'
import {
  h1Heading,
  bulletPoints,
  mainContentStyling,
  h2Heading,
  h3Heading,
} from './createPptx/createPptxStyling'
import { MarkdownLinkNode } from '@contentful/rich-text-from-markdown/dist/types/types'

type SlidesArray = [Slide]

type Slide = {
  heading: string
  text: string
  slideNotes: string
  SpeakerNotes?: string
  id: string | number
  Content: string
  Title: string
  Slides: SlidesArray
  index: number
}

const downloadAsPptx = async (data: any) => {
  const lectureData = {
    Title: data.attributes.Title,
    Abstract: data.attributes.Abstract,
    References: data.attributes.References,
    createdAt: data.attributes.createdAt,
    slides: data.attributes.Slides,
  }
  const slidesArray = lectureData.slides
  const lectureTitle = lectureData.Title

  const pptxSlides = await lectureToPptxSlideFormat(slidesArray, lectureTitle)

  createPptxFile(pptxSlides)
}

const lectureToPptxSlideFormat = async (
  slidesArray: SlidesArray,
  lectureTitle: string
) => {
  const promises = slidesArray.map((slide: Slide, index: number) => {
    slide.id = slide.id.toString()
    return slideSchemaToPptxFormat(slide, slidesArray, lectureTitle, index)
  })
  const pptxSlides: PptxSlide[] = await Promise.all(promises)
  return pptxSlides
}

const slideSchemaToPptxFormat = async (
  slide: Slide,
  slidesArray: SlidesArray,
  lectureTitle: string,
  index: number
) => {
  let pptxSlide: PptxSlide = {}
  let mainContentArray: string[] = []
  let imageUrl = ''

  const promises = Object.values(slide).map(async (value: any) => {
    const document: any = await richTextFromMarkdown(value, (_node) => {
      const node = _node as MarkdownLinkNode

      if (node.type === 'image' && node.url) {
        Promise.resolve({
          nodeType: 'embedded-[entry|asset]-[block|inline]',
          content: [node.url],
          data: {
            target: {
              sys: {
                type: 'Link',
                linkType: 'Entry|Asset',
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
          pptxSlide.h1Styling = h1Heading
        }
        if (document.content[i].nodeType === 'heading-2') {
          pptxSlide.heading = document.content[i].content[0].value
          pptxSlide.h1Styling = h2Heading
        }
        if (document.content[i].nodeType === 'heading-3') {
          pptxSlide.heading = document.content[i].content[0].value
          pptxSlide.h1Styling = h3Heading
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
    pptxSlide.image = imageUrl
  })

  pptxSlide.title = lectureTitle

  if (slidesArray) {
    pptxSlide.speakerNotes = slidesArray[index]?.SpeakerNotes
  }
  await Promise.all(promises)

  return pptxSlide
}

export default downloadAsPptx
