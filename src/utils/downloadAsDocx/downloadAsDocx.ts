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
import CourseDocxDownload from '../../components/DocxDownloadTemplates/CourseDocxDownload/CourseDocxDowload'
import { BaseError, processHTMLString } from './utils'

export type DownloadError = BaseError & {}

export const handleCourseDocxDownload = async (
  course: Data<CourseThreeLevelsDeep>
) => {
  const sourceHTML = ReactDOMServer.renderToString(
    CourseDocxDownload({ course })
  )
  const blob = await HTMLtoDOCX(sourceHTML, undefined, {}, undefined)
  saveAs(blob, `${course.attributes.Title}.docx`)
}

export const handleLectureDocxDownload = async (
  lecture: Data<LectureTwoLevelsDeep>
) => {
  const sourceHTML = ReactDOMServer.renderToString(
    LectureDocxDownload({ lecture })
  )
  const blob = await HTMLtoDOCX(sourceHTML, undefined, {}, undefined)
  saveAs(blob, `${lecture.attributes.Title}.docx`)
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
    console.error(`Download of docx failed with error: ${error}`)
    return {
      hasError: true,
    }
  }
}
