import PptxGenJS from 'pptxgenjs'
import { PptxSlide } from '../../types/pptx'

import {
  masterDescriptionSlide,
  descriptionTitle,
  imageStyling,
} from './createPptxStyling'

export const createPptxFile = async (
  pptxSlides: PptxSlide[],
  lectureTitle: string
) => {
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_WIDE'

  // Master slides
  pptx.defineSlideMaster(masterDescriptionSlide)
  const masterContentSlide = masterDescriptionSlide.title

  let descriptionSlide = pptx.addSlide({
    masterName: `${masterContentSlide}`,
  })
  descriptionSlide.addText(`${lectureTitle}`, descriptionTitle)

  //Content slides
  pptxSlides?.map((pptxSlide: PptxSlide) => {
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
  pptx.writeFile({ fileName: `${lectureTitle}.pptx` })
}
