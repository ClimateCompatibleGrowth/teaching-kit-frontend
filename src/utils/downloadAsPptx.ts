import { createBlockPptxFile } from './createPptx/createBlockPptx'
import { BlockOneLevelDeep, Data, Slide } from '../types'
import downloadBlockAsPptx from './downloadBlockAsPptx'
import downloadAsLecturePptx from './downloadLectureAsPptx'
import { createLecturePptxFile } from './createPptx/createLecturePptx'

const downloadAsPptx = async (block: Data<BlockOneLevelDeep>, lecture: any) => {
  if (block && !lecture) {
    const blockData = {
      Title: block.attributes.Title,
      slides: block.attributes.Slides,
    }

    const slidesArray: Slide[] = blockData.slides
    const blockTitle = blockData.Title

    const pptxSlides = await downloadBlockAsPptx(slidesArray)
    createBlockPptxFile(pptxSlides, blockTitle)
  } else {
    const pptxLecture = await downloadAsLecturePptx(lecture)
    const lectureTitle = lecture.attributes.Title
    createLecturePptxFile(pptxLecture, lectureTitle)
  }
}

export default downloadAsPptx
