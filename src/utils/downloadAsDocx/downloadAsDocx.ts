import ReactDOMServer from 'react-dom/server'
import { asBlob } from 'html-docx-js-typescript'
import saveAs from 'file-saver'

// @ts-ignore (needed until the following is merged: https://github.com/privateOmega/html-to-docx/pull/122)
// import HTMLtoDOCX from 'html-to-docx'

import { Data, DownloadableContent } from '../../types'
import { isCourseThreeLevelsDeep } from '../../types/checkers'
import { BaseError, processHTMLString } from './utils'
import JSZip from 'jszip'
import DocxDownload from '../../components/DocxDownloadTemplates/DocxDownloadTemplate'

export type DownloadError = BaseError & {}

const footer = `<div><span style="text-align: center;"></span><p style="font-size: 8pt">These teaching materials are based on content provided by Climate Compatible Growth as part of their FCDO-funded activities. As this content can be adapted by other institutions, the opinions expressed here may not reflect those of CCG or its funders.</p><br></div>`
const downloadConfiguration = {
  footer: true,
  pageNumber: true,
}

const createBlob = async (data: Data<DownloadableContent>) => {
  if (isCourseThreeLevelsDeep(data)) {
    const zip = new JSZip()
    for (const lecture of data.attributes.Lectures.data) {
      try {
        const { blob } = await createBlob(lecture)
        zip.file(`${lecture.attributes.Title}.docx`, blob)
      } catch (error) {
        console.error(error)
        zip.file(
          `FAILED_${lecture.attributes.Title}.docx`,
          `Docx generation failed for lecture ${lecture.attributes.Title}`
        )
      }
    }
    const blob = await zip.generateAsync({ type: 'blob' })
    return { blob, title: `${data.attributes.Title}.zip` }
  } else {
    const sourceHTML = ReactDOMServer.renderToString(DocxDownload({ data }))
    const newHtml = await processHTMLString(sourceHTML, data.attributes.Title)

    // const blob = await HTMLtoDOCX(
    //   newHtml,
    //   undefined,
    //   downloadConfiguration,
    //   footer
    // )
    const blob = (await asBlob(newHtml)) as Blob
    return { blob, title: `${data.attributes.Title}.docx` }
  }
}

export const handleDocxDownload = async (
  data: Data<DownloadableContent>
): Promise<void | DownloadError> => {
  try {
    const { blob, title } = await createBlob(data)
    saveAs(blob, title)
  } catch (error) {
    console.error(`Download of lecture docx failed with error: ${error}`)
    return {
      hasError: true,
    }
  }
}

export const getContentSize = async (
  data: Data<DownloadableContent>
): Promise<string> => {
  const { blob } = await createBlob(data)
  const size = blob.size
  const isBig = size > 10 ** 6
  const roundedSize = Math.round(isBig ? size / 10 ** 6 : size / 10 ** 3)
  return `${roundedSize}${isBig ? 'MB' : 'kB'}`
}
