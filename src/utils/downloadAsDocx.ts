import ReactDOMServer from 'react-dom/server'
import BlockDocxDownload from '../components/DocxDownloadTemplates/BlockDocxDownload/BlockDocxDownload'

// @ts-ignore (needed until the following is merged: https://github.com/privateOmega/html-to-docx/pull/122)
import HTMLtoDOCX from 'html-to-docx'

import {
  BlockOneLevelDeep,
  CourseThreeLevelsDeep,
  Data,
  LectureTwoLevelsDeep,
} from '../types'
import saveAs from 'file-saver'
import LectureDocxDownload from '../components/DocxDownloadTemplates/LectureDocxDownload/LectureDocxDownload'
import CourseDocxDownload from '../components/DocxDownloadTemplates/CourseDocxDownload/CourseDocxDowload'

export const handleCourseDocxDownload = async (
  course: Data<CourseThreeLevelsDeep>
) => {
  const { header, footer } = getWrappingHTMLElements(course.attributes.Title)
  const sourceHTML = ReactDOMServer.renderToString(
    CourseDocxDownload({ course })
  )
  const blob = await HTMLtoDOCX(sourceHTML, header, {}, footer)
  saveAs(blob, `${course.attributes.Title}.docx`)
}

export const handleLectureDocxDownload = async (
  lecture: Data<LectureTwoLevelsDeep>
) => {
  const { header, footer } = getWrappingHTMLElements(lecture.attributes.Title)
  const sourceHTML = ReactDOMServer.renderToString(
    LectureDocxDownload({ lecture })
  )
  const blob = await HTMLtoDOCX(sourceHTML, header, {}, footer)
  saveAs(blob, `${lecture.attributes.Title}.docx`)
}

export const handleBlockDocxDownload = async (
  block: Data<BlockOneLevelDeep>
) => {
  const { header, footer } = getWrappingHTMLElements(block.attributes.Title)
  const sourceHTML = ReactDOMServer.renderToString(BlockDocxDownload({ block }))
  const blob = await HTMLtoDOCX(sourceHTML, header, {}, footer)
  saveAs(blob, `${block.attributes.Title}.docx`)
}

const getWrappingHTMLElements = (title: string) => ({
  header: getPageHeaderHTML(title),
  footer: getFooterHTML(),
})

const getPageHeaderHTML = (title: string) =>
  `<html><head><meta charset='utf-8'><title>${title}</title></head><body>`

const getFooterHTML = () => '</body></html>'
