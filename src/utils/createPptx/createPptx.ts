import PptxGenJS from 'pptxgenjs'
import { PptxSlide } from '../../types'

import {
  masterDescriptionSlide,
  descriptionTitle,
  imageStyling,
} from './createPptxStyling'

export const createPptxFile = async (pptxSlides: PptxSlide[]) => {
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_WIDE'

  // Master slides
  pptx.defineSlideMaster(masterDescriptionSlide)
  const masterContentSlide = masterDescriptionSlide.title

  let descriptionSlide = pptx.addSlide({
    masterName: `${masterContentSlide}`,
  })
  descriptionSlide.addText(`${pptxSlides[0]?.title}`, descriptionTitle)

  //Content slides
  pptxSlides?.map((pptxSlide: PptxSlide) => {
    let bulletString = ''
    const contentSlide = pptx.addSlide()

    //Headings
    contentSlide.addText(`${pptxSlide.heading}`, pptxSlide.h1Styling)

    contentSlide.addImage({
      path: `${pptxSlide?.image}`,
      x: '70%',
      y: '5%',
      w: '25%',
      h: '30%',
    })

    //Main content
    contentSlide.addText(
      `${pptxSlide?.mainContent}`,
      pptxSlide.mainContentStyling
    )

    //Bullet points
    if (pptxSlide.list) {
      console.log(pptxSlide.list, 'pptxSlide.list')

      for (let i: number = 0; i < pptxSlide.list?.length; i++) {
        bulletString +=
          '\n' + `${pptxSlide.list[i].content[0].content[0].value}`
      }
      contentSlide.addText(`${bulletString}`, pptxSlide.bulletStyling)
    }
    //Slide notes
    contentSlide.addNotes(`${pptxSlide.speakerNotes}`)
  })
  pptx.writeFile({ fileName: `${pptxSlides[0].title}.pptx` })
}
