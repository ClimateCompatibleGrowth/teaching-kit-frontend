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
  const slides = await generateSlides(block)
  const title = block.attributes.Title

  const pptx = await createBlockPptxFile(slides, title)
  return pptx
}

const generateSlides = async (
  block: Data<BlockOneLevelDeep>
): Promise<PptxSlide[]> => {
  const pptxSlides = Promise.all(
    block.attributes.Slides.map(async (slide: Slide) => {
      slide.id = slide.id.toString()

      return await markdownToSlideFormat(slide)
    })
  )

  return pptxSlides
}
