import PptxGenJS from 'pptxgenjs'
import { imageStyling } from '../pptxConfiguration/slideElements'
import { PptxSlide } from '../../../types/pptx'

const getSlides = (blockSlides: PptxSlide[], pptx: PptxGenJS) => {
  return blockSlides.map((pptxSlide) => {
    const contentSlide = pptx.addSlide()

    //Headings
    contentSlide.addText(`${pptxSlide.heading}`, pptxSlide.headingStyling)

    if (pptxSlide?.images !== undefined && pptxSlide?.images.length > 0) {
      for (const image of pptxSlide.images) {
        contentSlide.addImage({
          ...imageStyling,
          ...image,
        })
      }
    }

    if (pptxSlide?.mainContent !== undefined) {
      contentSlide.addText(pptxSlide.mainContent, pptxSlide.mainContentStyling)
    }

    //Bullet points
    if (pptxSlide.list) {
      contentSlide.addText(pptxSlide.list, pptxSlide.listStyling)
    }

    contentSlide.addNotes(`${pptxSlide.speakerNotes}`)
  })
}

export default getSlides
