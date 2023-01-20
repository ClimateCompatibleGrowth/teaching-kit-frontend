import { Data, LectureTwoLevelsDeep, Slide } from '../../types'

import generatePptxSlides from './generatePptxSlides'

const downloadAsLecturePptx = (lecture: Data<LectureTwoLevelsDeep>) => {
  const blocks = lecture.attributes.Blocks.data

  const lectureBlockSlides = blocks.map((blockSlides) => {
    const lectureBlockSlides = blockSlides.attributes.Slides.map(
      (slide: Slide) => {
        slide.id = slide.id.toString()

        return generatePptxSlides(slide)
      }
    )

    return {
      title: blockSlides.attributes.Title,
      pptxSlides: lectureBlockSlides,
    }
  })

  return lectureBlockSlides
}

export default downloadAsLecturePptx
