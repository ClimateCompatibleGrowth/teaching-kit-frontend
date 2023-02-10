import PptxGenJS from 'pptxgenjs'
import { imageStyling } from '../pptxConfiguration/slideElements'
import { PptxSlide } from '../../../types/pptx'

const getSlides = (blockSlides: PptxSlide[], pptx: PptxGenJS) => {
  return blockSlides.map((pptxSlide) => {
    let contentSlide = pptx.addSlide()
    console.log('pptx', pptxSlide)

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

    if (pptxSlide.tables) {
      let index = 0
      for (const table of pptxSlide.tables) {
        let slide = contentSlide
        if (index !== 0 || pptxSlide?.mainContent !== undefined) {
          slide = pptx.addSlide()
        }
        slide.addText(`${pptxSlide.heading}`, pptxSlide.headingStyling)
        slide.addTable(
          table,
          pptxSlide.tableStyling ? pptxSlide.tableStyling[index] : {}
        )
        index += 1
      }
    }

    contentSlide.addNotes(`${pptxSlide.speakerNotes}`)
  })
}

export default getSlides
