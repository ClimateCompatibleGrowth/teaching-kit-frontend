import PptxGenJS from 'pptxgenjs'
import { imageStyling } from '../pptxConfigurations'
import { PptxSlide } from '../../../types/pptx'

const getSlides = (block: PptxSlide[], pptx: PptxGenJS) => {
  return block.map((pptxSlide) => {
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
      contentSlide.addText(
        pptxSlide?.mainContent?.join(''),
        pptxSlide.mainContentStyling
      )
    }

    //Bullet points
    if (pptxSlide.list) {
      const bulletString = pptxSlide.list.map((item) => item.text).join('\n')

      contentSlide.addText(`${bulletString}`, pptxSlide.bulletStyling)
    }

    contentSlide.addNotes(`${pptxSlide.speakerNotes}`)
  })
}

export default getSlides
