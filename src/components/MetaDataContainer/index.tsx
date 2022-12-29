import React from 'react'
import { Author, BlockOneLevelDeep, Data, Level } from '../../types'
import handleDocxDownload from '../../utils/downloadAsDocx'
import handlePptxDownload from '../../utils/downloadAsPptx'

import * as Styled from './styles'

type DocxDownloadParameters = {
  title: string
  courseId?: number
  blocks?: Data<BlockOneLevelDeep>[]
}

type PptxDownloadParameters = {
  data: Data<BlockOneLevelDeep>
}

export type Props = {
  level?: Level
  duration?: string
  authors?: { data: Data<Author>[] }
  docxDownloadParameters: DocxDownloadParameters
  pptxDownloadParameters?: PptxDownloadParameters
}

export default function MetadataContainer({
  level,
  duration,
  authors,
  docxDownloadParameters,
  pptxDownloadParameters,
}: Props) {
  return (
    <Styled.MetadataContainer id='meta-data-html'>
      {level !== undefined ? (
        <Styled.HeadingSet>
          <h6>Level</h6>
          <p>{level}</p>
        </Styled.HeadingSet>
      ) : null}
      {duration !== undefined ? (
        <Styled.HeadingSet>
          <h6>Duration</h6>
          <p>{duration}</p>
        </Styled.HeadingSet>
      ) : null}
      <h4>Authors</h4>
      <Styled.Ul>
        {authors?.data.map((author) => (
          <Styled.Li key={author.id}>
            {author.attributes.Name}:{' '}
            <a href={`mailto:${author.attributes.Email}`}>
              {author.attributes.Email}
            </a>
          </Styled.Li>
        ))}
      </Styled.Ul>
      <h4>Download</h4>
      <Styled.DownloadContainer>
        <button
          onClick={() =>
            handleDocxDownload(
              docxDownloadParameters?.title,
              docxDownloadParameters?.courseId,
              docxDownloadParameters?.blocks
            )
          }
        >
          Docx
        </button>
        {pptxDownloadParameters !== undefined ? (
          <button
            onClick={() => handlePptxDownload(pptxDownloadParameters?.data)}
          >
            Pptx
          </button>
        ) : null}
      </Styled.DownloadContainer>
    </Styled.MetadataContainer>
  )
}
