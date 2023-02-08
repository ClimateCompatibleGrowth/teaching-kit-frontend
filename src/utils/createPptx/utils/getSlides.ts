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

    // Tables
    if (pptxSlide.tables) {
      let index = 0
      for (const table of pptxSlide.tables) {
        contentSlide.addTable(
          table,
          pptxSlide.tableStyling ? pptxSlide.tableStyling[index] : {}
        )
        if (
          pptxSlide.tables.length > 1 &&
          index !== pptxSlide.tables.length - 1
        ) {
          contentSlide = pptx.addSlide()
          contentSlide.addText(`${pptxSlide.heading}`, pptxSlide.headingStyling)
        }
        index += 1
      }
    }

    contentSlide.addNotes(`${pptxSlide.speakerNotes}`)
  })
}

export default getSlides
