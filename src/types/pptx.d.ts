type PptxSlideListContent = {
  text: string
}

export type PptxSlide = {
  title?: string
  mainContent?: string[]
  speakerNotes?: string
  image?: string
  headingStyling?: {}
  mainContentStyling?: any
  bulletStyling?: any
  heading?: string
  list?: PptxSlideListContent[]
}
