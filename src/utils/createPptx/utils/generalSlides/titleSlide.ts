import PptxGenJS from 'pptxgenjs'
import {
  masterDescriptionSlide,
  descriptionTitle,
} from '../../createPptxStyling'

const createTitleSlide = (lectureTitle: string, pptx: PptxGenJS) => {
  // Master slides
  pptx.defineSlideMaster(masterDescriptionSlide)
  const masterContentSlide = masterDescriptionSlide.title

  let descriptionSlide = pptx.addSlide({
    masterName: `${masterContentSlide}`,
  })
  descriptionSlide.addText(`${lectureTitle}`, descriptionTitle)
}

export default createTitleSlide
