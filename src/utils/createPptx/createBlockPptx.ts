import PptxGenJS from 'pptxgenjs'
import { PptxSlide } from '../../types/pptx'

import {
  masterDescriptionSlide,
  descriptionTitle,
  imageStyling,
} from './createPptxStyling'

export const createBlockPptxFile = async (
  pptxSlides: PptxSlide[],
  lectureTitle: string
) => {
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_WIDE'
  console.log('pptxSlides', pptxSlides)

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
    console.log('pptxSlide', pptxSlide)

    //Headings
    contentSlide.addText(`${pptxSlide.heading}`, pptxSlide.headingStyling)

    contentSlide.addImage({
      path: `${pptxSlide?.image}`,
      ...imageStyling,
    })

    //Main content
    contentSlide.addText(
      `${pptxSlide?.mainContent}`,
      pptxSlide.mainContentStyling
    )

    //Bullet points
    if (pptxSlide.list) {
      const bulletString = pptxSlide.list
        .map((item) => {
          return item.content[0].content[0].value
        })
        .join('\n')

      contentSlide.addText(`${bulletString}`, pptxSlide.bulletStyling)
    }

    contentSlide.addNotes(`${pptxSlide.speakerNotes}`)
  })
  pptx.writeFile({ fileName: `${lectureTitle}.pptx` })
}
