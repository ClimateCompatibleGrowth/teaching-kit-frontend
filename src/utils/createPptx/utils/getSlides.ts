import PptxGenJS from 'pptxgenjs'
import { imageStyling } from '../pptxConfiguration/slideElements'
import { PptxSlide } from '../../../types/pptx'

const getSlides = (blockSlides: PptxSlide[], pptx: PptxGenJS) => {
  return blockSlides.map((pptxSlide) => {
    const contentSlide = pptx.addSlide()

    //Headings
    contentSlide.addText(`${pptxSlide.heading}`, pptxSlide.headingStyling)

    if (pptxSlide?.image !== undefined && pptxSlide?.image !== '') {
      contentSlide.addImage({
        path: `${pptxSlide.image}?do-not-fetch-from-cache`,
        ...imageStyling,
      })
    }

    console.log(pptxSlide.mainContent)
    console.log(pptxSlide.list)

    if (pptxSlide?.mainContent !== undefined) {
      contentSlide.addText(pptxSlide.mainContent, pptxSlide.mainContentStyling)
    }

    //Bullet points
    if (pptxSlide.list) {
      const bulletString = pptxSlide.list.map((item) => item.text).join('\n')

      contentSlide.addText(`${bulletString}`, pptxSlide.listStyling)
    }

    console.log(contentSlide)

    contentSlide.addNotes(`${pptxSlide.speakerNotes}`)
  })
}

export default getSlides
