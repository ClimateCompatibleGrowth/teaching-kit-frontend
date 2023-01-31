import PptxGenJS from 'pptxgenjs'
import { LectureBlock } from '../../types/pptx'
import getSlides from './utils/getSlides'

import createTitleSlide from './utils/generalSlides/titleSlide'
import {
  descriptionTitle,
  masterDescriptionSlide,
} from './pptxConfiguration/masterSlide'

export const createLecturePptxFile = async (
  lectureBlocks: LectureBlock[],
  lectureTitle: string
) => {
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_WIDE'

  createTitleSlide(lectureTitle, pptx)

  lectureBlocks.map((block) => {
    pptx.defineSlideMaster(masterDescriptionSlide)
    const masterContentSlide = masterDescriptionSlide.title

    let descriptionSlide = pptx.addSlide({
      masterName: `${masterContentSlide}`,
    })
    descriptionSlide.addText(`${block.title}`, descriptionTitle)

    return getSlides(block.pptxSlides, pptx)
  })

  return pptx
}
