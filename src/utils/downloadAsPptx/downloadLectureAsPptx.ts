import { Data, LectureTwoLevelsDeep, Slide } from '../../types'
import PptxGenJS from 'pptxgenjs'

import markdownToSlideFormat from './markdownToSlideFormat'
import { createLecturePptxFile } from '../createPptx/createLecturePptx'

export const downloadLecturePptx = async (
  lecture: Data<LectureTwoLevelsDeep>
) => {
  const title = lecture.attributes.Title
  const pptx = await lectureToPptx(lecture)
  pptx.writeFile({ fileName: `${title}.pptx` })
}

export const lectureToPptx = async (
  lecture: Data<LectureTwoLevelsDeep>
): Promise<PptxGenJS> => {
  const slides = generateLectureBlockSlides(lecture)
  const title = lecture.attributes.Title

  const pptx = await createLecturePptxFile(slides, title)
  return pptx
}

const generateLectureBlockSlides = (lecture: Data<LectureTwoLevelsDeep>) => {
  const blocks = lecture.attributes.Blocks.data

  const lectureBlockSlides = blocks.map((blockSlides) => {
    const lectureBlockSlides = blockSlides.attributes.Slides.map(
      (slide: Slide) => {
        slide.id = slide.id.toString()

        return markdownToSlideFormat(slide)
      }
    )

    return {
      title: blockSlides.attributes.Title,
      pptxSlides: lectureBlockSlides,
    }
  })

  return lectureBlockSlides
}
