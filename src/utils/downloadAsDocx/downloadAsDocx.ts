import ReactDOMServer from 'react-dom/server'
import saveAs from 'file-saver'

// @ts-ignore (needed until the following is merged: https://github.com/privateOmega/html-to-docx/pull/122)
import HTMLtoDOCX from 'html-to-docx'

import {
  BlockOneLevelDeep,
  CourseThreeLevelsDeep,
  Data,
  LectureTwoLevelsDeep,
} from '../../types'
import BlockDocxDownload from '../../components/DocxDownloadTemplates/BlockDocxDownload/BlockDocxDownload'
import LectureDocxDownload from '../../components/DocxDownloadTemplates/LectureDocxDownload/LectureDocxDownload'
import { BaseError, processHTMLString } from './utils'
import JSZip from 'jszip'

export type DownloadError = BaseError & {}

const createLectureBlob = async (lecture: Data<LectureTwoLevelsDeep>) => {
  const sourceHTML = ReactDOMServer.renderToString(
    LectureDocxDownload({ lecture })
  )
  const lectureBlob = await HTMLtoDOCX(sourceHTML, undefined, {}, undefined)
  return lectureBlob
}

export const handleCourseDocxDownload = async (
  course: Data<CourseThreeLevelsDeep>
) => {
  const zip = new JSZip()
  for (const lecture of course.attributes.Lectures.data) {
    try {
      const lectureBlob = await createLectureBlob(lecture)
      zip.file(`${lecture.attributes.Title}.docx`, lectureBlob)
    } catch (error) {
      zip.file(
        `Docx generation failed for lecture ${lecture.attributes.Title}`,
        `FAILED_${lecture.attributes.Title}.docx`
      )
    }
  }
  const generatedZip = await zip.generateAsync({ type: 'blob' })
  saveAs(generatedZip, `${course.attributes.Title}.zip`)
}

export const handleLectureDocxDownload = async (
  lecture: Data<LectureTwoLevelsDeep>
): Promise<void | DownloadError> => {
  try {
    const blob = await createLectureBlob(lecture)
    saveAs(blob, `${lecture.attributes.Title}.docx`)
  } catch (error) {
    console.error(`Download of lecture docx failed with error: ${error}`)
    return {
      hasError: true,
    }
  }
}

export const handleBlockDocxDownload = async (
  block: Data<BlockOneLevelDeep>
): Promise<void | DownloadError> => {
  const sourceHTML = ReactDOMServer.renderToString(
    BlockDocxDownload({ block, downloadedAs: 'BLOCK' })
  )

  try {
    const newHtml = await processHTMLString(sourceHTML, block.attributes.Title)
    const blob = await HTMLtoDOCX(newHtml, undefined, {}, undefined)
    saveAs(blob, `${block.attributes.Title}.docx`)
  } catch (error) {
    console.error(`Download of block docx failed with error: ${error}`)
    return {
      hasError: true,
    }
  }
}
