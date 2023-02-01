import PptxGenJS from 'pptxgenjs'

type PptxSlideListContent = {
  text: string
}

export type PptxSlide = {
  title: string
  heading: string
  mainContent?: string[]
  mainContentStyling?: PptxGenJS.TextPropsOptions
  speakerNotes?: string
  image?: string
  headingStyling?: {}
  listStyling?: PptxGenJS.TextPropsOptions
  list?: PptxSlideListContent[]
}

export type LectureBlock = {
  title: string
  pptxSlides: PptxSlide[]
}
