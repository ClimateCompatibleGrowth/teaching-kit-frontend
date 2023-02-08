import PptxGenJS from 'pptxgenjs'
import { Author, Data } from '.'

export type PptxSlide = {
  title: string
  heading: string
  mainContent: PptxGenJS.TextProps[]
  mainContentStyling?: PptxGenJS.TextPropsOptions
  speakerNotes?: string
  images?: PptxGenJS.ImageProps[]
  headingStyling?: {}
  listStyling?: PptxGenJS.TextPropsOptions
  list?: PptxGenJS.TextProps[]
}

export type LectureBlock = {
  title: string
  pptxSlides: PptxSlide[]
  authors: Data<Author>[]
}
