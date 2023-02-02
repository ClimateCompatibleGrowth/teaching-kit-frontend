import PptxGenJS from 'pptxgenjs'

export type PptxSlide = {
  title: string
  heading: string
  mainContent: PptxGenJS.TextProps[]
  mainContentStyling?: PptxGenJS.TextPropsOptions
  speakerNotes?: string
  image?: string
  headingStyling?: {}
  listStyling?: PptxGenJS.TextPropsOptions
  list?: PptxGenJS.TextProps[]
}

export type LectureBlock = {
  title: string
  pptxSlides: PptxSlide[]
}
