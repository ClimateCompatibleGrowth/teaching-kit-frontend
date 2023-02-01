type PptxSlideListContent = {
  text: string
}

export type PptxSlide = {
  title: string
  heading: string
  mainContent?: string[]
  mainContentStyling?: any
  speakerNotes?: string
  image?: string
  headingStyling?: {}
  bulletStyling?: any
  list?: PptxSlideListContent[]
}

export type LectureBlock = {
  title: string
  pptxSlides: PptxSlide[]
}
