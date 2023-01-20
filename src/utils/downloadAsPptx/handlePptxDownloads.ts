import { createBlockPptxFile } from '../createPptx/createBlockPptx'
import {
  BlockOneLevelDeep,
  Data,
  LectureTwoLevelsDeep,
  Slide,
} from '../../types'
import downloadBlockAsPptx from './downloadBlockAsPptx'
import downloadAsLecturePptx from './downloadLectureAsPptx'
import { createLecturePptxFile } from '../createPptx/createLecturePptx'

export const handleBlockPptxDownload = (block: Data<BlockOneLevelDeep>) => {
  const blockData = {
    Title: block.attributes.Title,
    slides: block.attributes.Slides,
  }

  const slidesArray: Slide[] = blockData.slides
  const blockTitle = blockData.Title

  const pptxSlides = downloadBlockAsPptx(slidesArray)
  createBlockPptxFile(pptxSlides, blockTitle)
}

export const handleLecturePptxDownload = (
  lecture: Data<LectureTwoLevelsDeep>
) => {
  const lectureBlocks = downloadAsLecturePptx(lecture)
  const lectureTitle = lecture.attributes.Title

  createLecturePptxFile(lectureBlocks, lectureTitle)
}
