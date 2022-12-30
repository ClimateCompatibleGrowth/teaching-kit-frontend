import React from 'react'
import { Author, BlockOneLevelDeep, Data, Level } from '../../types'
import handleDocxDownload from '../../utils/downloadAsDocx'
import handlePptxDownload from '../../utils/downloadAsPptx'
import Button from '../Button/Button'

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
      {authors !== undefined ? (
        <Styled.HeadingSet>
          <h6>Authors</h6>
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
        </Styled.HeadingSet>
      ) : null}
      {pptxDownloadParameters !== undefined ||
      docxDownloadParameters !== undefined ? (
        <Styled.HeadingSet>
          <h6>Download</h6>
          <Styled.DownloadButtonsContainer>
            <Button
              onClick={() =>
                handleDocxDownload(
                  docxDownloadParameters?.title,
                  docxDownloadParameters?.courseId,
                  docxDownloadParameters?.blocks
                )
              }
            >
              DOCX
            </Button>
            {pptxDownloadParameters !== undefined ? (
              <button
                onClick={() => handlePptxDownload(pptxDownloadParameters?.data)}
              >
                Pptx
              </button>
            ) : null}
          </Styled.DownloadButtonsContainer>
        </Styled.HeadingSet>
      ) : null}
    </Styled.MetadataContainer>
  )
}
