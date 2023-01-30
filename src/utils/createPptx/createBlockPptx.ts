import PptxGenJS from 'pptxgenjs'
import { PptxSlide } from '../../types/pptx'

import createTitleSlide from './utils/generalSlides/titleSlide'
import getSlides from './utils/getSlides'

export const createBlockPptxFile = async (
  pptxSlides: PptxSlide[],
  title: string
) => {
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_WIDE'

  createTitleSlide(title, pptx)
  getSlides(pptxSlides, pptx)

  return pptx
}
