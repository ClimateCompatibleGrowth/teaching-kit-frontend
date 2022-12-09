import axios from 'axios'
import ReactDOMServer from 'react-dom/server'
import { Block } from '../components/Block'
import { Lecture } from '../components/Lecture'

import { Block as BlockType } from '../types'
import { Lecture as LectureType } from '../types'

export default async function handleDocxDownload(
  title?: string,
  courseId?: number,
  blocks?: BlockType[]
) {
  const header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" + // Old url?
    "xmlns='https://www.w3.org/TR/css-multicol-1/'>" +
    `<head><meta charset='utf-8'><title>${title}</title></head><body>`
  const footer = '</body></html>'
  // Add metaData
  const metaDataHTML = document
    ? header + document.getElementById('meta-data-html')?.outerHTML
    : ''

  // Add current page content
  let sourceHTML = document
    ? document.getElementById('source-html')?.outerHTML + ''
    : ''

  // Add LearningMaterial children's content
  if (courseId) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/courses/${courseId}?populate[Lectures][populate][0]=Blocks`
    )
    const lectures = res.data.data.attributes.Lectures.data

    lectures?.map((lecture: LectureType) => {
      sourceHTML += ReactDOMServer.renderToString(Lecture({ lecture }))

      lecture.attributes.Blocks.data?.map((block: BlockType) => {
        sourceHTML += ReactDOMServer.renderToString(Block({ block }))
      })
    })
  } else {
    blocks?.map((block: BlockType) => {
      sourceHTML += ReactDOMServer.renderToString(Block({ block }))
    })
  }

  sourceHTML += footer


  const source =
    'data:application/vnd.ms-word;charset=utf-8,' +
    encodeURIComponent(metaDataHTML) +
    encodeURIComponent(sourceHTML)

  const fileDownload = document.createElement('a')
  document.body.appendChild(fileDownload)
  fileDownload.href = source
  fileDownload.download = 'document.docx'
  fileDownload.click()
  document.body.removeChild(fileDownload)
}
