import PptxGenJS from 'pptxgenjs'
import {
  descriptionTitle,
  masterDescriptionSlide,
} from '../../pptxConfiguration/masterSlide'

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
