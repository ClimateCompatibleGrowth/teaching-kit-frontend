import PptxGenJS from 'pptxgenjs'
import { PptxSlide } from '../../../types/pptx'

const getSlides = (blockSlides: PptxSlide[], pptx: PptxGenJS) => {
  return blockSlides.map((pptxSlide) => {
    const contentSlide = pptx.addSlide()

    contentSlide.addText(`${pptxSlide.heading}`, pptxSlide.headingStyling)

    if (pptxSlide?.images !== undefined && pptxSlide?.images.length > 0) {
      for (const image of pptxSlide.images) {
        contentSlide.addImage(image)
      }
    }

    if (pptxSlide?.mainContent !== undefined) {
      contentSlide.addText(pptxSlide.mainContent, pptxSlide.mainContentStyling)
    }

    contentSlide.addNotes(`${pptxSlide.speakerNotes}`)

    if (pptxSlide?.citeAs !== undefined) {
      contentSlide.addText(`${pptxSlide.citeAs}`, pptxSlide.citeAsStyling)
    }
  })
}

export default getSlides
