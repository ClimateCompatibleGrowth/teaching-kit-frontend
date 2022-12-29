import ReactDOMServer from 'react-dom/server'
import { Block } from '../components/Block'
import { Lecture } from '../components/Lecture'
import { getCourseWithLecturesAndBlocks } from '../shared/requests/courses/courses'

import { BlockOneLevelDeep, Data } from '../types'

export default async function handleDocxDownload(
  title?: string,
  courseId?: number,
  blocks?: Data<BlockOneLevelDeep>[]
) {
  const header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" + // Old url?
    `<head><meta charset='utf-8'><title>${title}</title></head><body>`
  const footer = '</body></html>'
  // Add metaData
  const metadataHTML = document
    ? header + document.getElementById('meta-data-html')?.outerHTML
    : ''

  // Add current page content
  let sourceHTML = document
    ? document.getElementById('source-html')?.outerHTML + ''
    : ''

  // Add LearningMaterial children's content
  if (courseId) {
    const res = await getCourseWithLecturesAndBlocks(courseId.toString())
    const lectures = res.attributes.Lectures.data

    lectures?.map((lecture) => {
      sourceHTML += ReactDOMServer.renderToString(Lecture({ lecture }))

      lecture.attributes.Blocks.data?.map((block) => {
        sourceHTML += ReactDOMServer.renderToString(Block({ block }))
      })
    })
  } else {
    blocks?.map((block) => {
      sourceHTML += ReactDOMServer.renderToString(Block({ block }))
    })
  }

  sourceHTML += footer

  const source =
    'data:application/vnd.ms-word;charset=utf-8,' +
    encodeURIComponent(metadataHTML) +
    encodeURIComponent(sourceHTML)

  const fileDownload = document.createElement('a')
  document.body.appendChild(fileDownload)
  fileDownload.href = source
  fileDownload.download = 'document.docx'
  fileDownload.click()
  document.body.removeChild(fileDownload)
}
