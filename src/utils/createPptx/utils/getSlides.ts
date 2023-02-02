import PptxGenJS from 'pptxgenjs'
import { imageStyling } from '../pptxConfiguration/slideElements'
import { PptxSlide } from '../../../types/pptx'
import { stripBackslashN } from '../../utils'

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

    if (pptxSlide?.mainContent !== undefined) {
      contentSlide.addText(pptxSlide.mainContent, pptxSlide.mainContentStyling)
    }

    //Bullet points
    if (pptxSlide.list) {
      const bulletString = pptxSlide.list.map((item) => ({
        text: stripBackslashN(item.text), // '\n' confuses pptxgen of what is a list item and not
        options: {
          bullet: true,
        },
      }))

      console.log(bulletString)

      contentSlide.addText(bulletString, pptxSlide.listStyling)
    }

    contentSlide.addNotes(`${pptxSlide.speakerNotes}`)
  })
}

export default getSlides
