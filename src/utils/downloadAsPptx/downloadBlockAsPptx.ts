import { BlockOneLevelDeep, Data, Slide } from '../../types'
import { PptxSlide } from '../../types/pptx'
import { createBlockPptxFile } from '../createPptx/createBlockPptx'
import PptxGenJS from 'pptxgenjs'

import markdownToSlideFormat from './markdownToSlideFormat'

export const downloadBlockPptx = async (block: Data<BlockOneLevelDeep>) => {
  const title = block.attributes.Title
  const pptx = await blockToPptx(block)
  pptx.writeFile({ fileName: `${title}.pptx` })
}

export const blockToPptx = async (
  block: Data<BlockOneLevelDeep>
): Promise<PptxGenJS> => {
  const slides = generateSlides(block)
  const title = block.attributes.Title

  const pptx = await createBlockPptxFile(slides, title)
  return pptx
}

const generateSlides = (block: Data<BlockOneLevelDeep>): PptxSlide[] => {
  const pptxSlides = block.attributes.Slides.map((slide: Slide) => {
    slide.id = slide.id.toString()

    return markdownToSlideFormat(slide)
  })

  return pptxSlides
}
