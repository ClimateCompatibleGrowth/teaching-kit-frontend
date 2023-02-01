import PptxGenJS from 'pptxgenjs'
import { LectureBlock } from '../../types/pptx'
import getSlides from './utils/getSlides'

import createTitleSlide from './utils/generalSlides/titleSlide'

import { descriptionTitle } from './pptxConfiguration/slideElements'

export const createLecturePptxFile = async (
  lectureBlocks: LectureBlock[],
  lectureTitle: string
) => {
  const pptx = new PptxGenJS()
  const descriptionSlide = pptx.addSlide()

  pptx.layout = 'LAYOUT_WIDE'

  descriptionSlide.addText(lectureTitle, descriptionTitle)

  lectureBlocks.map((block) => {
    const authors = block.authors
    const title = block.title

    createTitleSlide(title, pptx, authors)

    return getSlides(block.pptxSlides, pptx)
  })

  return pptx
}
