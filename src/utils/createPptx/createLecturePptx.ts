import PptxGenJS from 'pptxgenjs'
import { Slide } from '../../types'
import { PptxLectureSlides, PptxSlide } from '../../types/pptx'

import {
  masterDescriptionSlide,
  descriptionTitle,
  imageStyling,
} from './createPptxStyling'

export const createLecturePptxFile = async (
  pptxSlides: PptxLectureSlides[],
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

  pptxSlides.map((slides) => {
    // console.log('slides', slides)

    slides.map((pptxSlide) => {
      const contentSlide = pptx.addSlide()

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
  })
  pptx.writeFile({ fileName: `${lectureTitle}.pptx` })
}
