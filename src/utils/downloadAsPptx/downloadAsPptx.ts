import PptxGenJS from 'pptxgenjs'
import { saveAs } from 'file-saver'
import {
  Author,
  BlockOneLevelDeep,
  CourseThreeLevelsDeep,
  Data,
  DownloadableContent,
  LectureTwoLevelsDeep,
  Slide,
} from '../../types'

import getSlides from '../createPptx/utils/getSlides'
import createTitleSlide from '../createPptx/utils/generalSlides/titleSlide'

import { descriptionTitle } from '../createPptx/pptxConfiguration/slideElements'
import {
  isBlockOneLevelDeep,
  isCourseThreeLevelsDeep,
  isLectureTwoLevelsDeep,
} from '../../types/checkers'
import JSZip from 'jszip'
import markdownToSlideFormat from './markdownToSlideFormat'
import { DownloadError } from '../downloadAsDocx/downloadAsDocx'

export const handlePptxDownload = async (
  data: Data<DownloadableContent>
): Promise<void | DownloadError> => {
  try {
    const { pptx, fileType } = await createPptxFile(data)

    if (fileType === 'zip' && Array.isArray(pptx)) {
      const zip = new JSZip()
      for (const [index, file] of pptx.entries()) {
        const blob = file.write()
        zip.file(`${index + 1}. ${file.title}.pptx`, blob)
      }
      const generatedZip = await zip.generateAsync({ type: 'blob' })

      saveAs(generatedZip, `${data.attributes.Title}.zip`)
    } else if (fileType === 'pptx' && !Array.isArray(pptx)) {
      pptx.writeFile({ fileName: `${data.attributes.Title}.pptx` })
    }
  } catch (error) {
    console.error(`Download of pptx failed with error: ${error}`)
    return {
      hasError: true,
    }
  }
}

export const createPptxFile = async (data: Data<DownloadableContent>) => {
  if (isCourseThreeLevelsDeep(data)) {
    return { pptx: await createCoursePptxFile(data), fileType: 'zip' }
  } else if (isLectureTwoLevelsDeep(data)) {
    return { pptx: await createLecturePptxFile(data), fileType: 'pptx' }
  } else if (isBlockOneLevelDeep(data)) {
    return { pptx: await createBlockPptxFile(data), fileType: 'pptx' }
  }
  return {}
}

export const getContentSize = async (
  data: Data<DownloadableContent>
): Promise<string> => {
  const { pptx } = await createPptxFile(data)
  let size
  if (Array.isArray(pptx)) {
    const blobSizes = await Promise.all(
      pptx.map(async (p) => ((await p.write()) as Blob).size)
    )
    size = blobSizes.reduce((total, blob) => total + blob, 0)
  } else {
    size = ((await pptx?.write()) as Blob).size
  }

  const isBig = size > 10 ** 6
  const roundedSize = Math.round(isBig ? size / 10 ** 6 : size / 10 ** 3)
  return `${roundedSize}${isBig ? 'MB' : 'kB'}`
}

const createCoursePptxFile = async (data: Data<CourseThreeLevelsDeep>) => {
  const pptxs = []
  for (const lecture of data.attributes.Lectures.data) {
    const pptx = new PptxGenJS()
    await createLecturePptxFile(lecture, pptx)
    pptxs.push(pptx)
  }
  return pptxs
}

const createLecturePptxFile = async (
  data: Data<LectureTwoLevelsDeep>,
  pptx?: PptxGenJS
) => {
  pptx = pptx ? pptx : new PptxGenJS()
  const descriptionSlide = pptx.addSlide()

  pptx.layout = 'LAYOUT_WIDE'
  pptx.title = data.attributes.Title

  descriptionSlide.addText(data.attributes.Title, descriptionTitle)
  for (const block of data.attributes.Blocks.data) {
    if (block.attributes.Slides.length > 0) {
      await createBlockPptxFile(block, pptx)
    }
  }
  return pptx
}

const createBlockPptxFile = async (
  data: Data<BlockOneLevelDeep>,
  pptx?: PptxGenJS
): Promise<PptxGenJS> => {
  const slides = await Promise.all(
    data.attributes.Slides.map((slide: Slide) => {
      slide.id = slide.id.toString()

      return markdownToSlideFormat(slide)
    })
  )
  const title = data.attributes.Title
  const authors: Data<Author>[] = data.attributes.Authors.data

  pptx = pptx ? pptx : new PptxGenJS()
  pptx.layout = 'LAYOUT_WIDE'

  createTitleSlide(title, pptx, authors)
  getSlides(slides, pptx)

  return pptx
}
