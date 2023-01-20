import { Slide } from '../../types'

import generatePptxSlides from './generatePptxSlides'

const blockToPptxSlideFormat = (slidesArray: Slide[]) => {
  const pptxSlides = slidesArray.map((slide: Slide) => {
    slide.id = slide.id.toString()

    return generatePptxSlides(slide)
  })

  return pptxSlides
}

export default blockToPptxSlideFormat
