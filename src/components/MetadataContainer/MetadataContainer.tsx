import React, { useState } from 'react'
import { Author, Data } from '../../types'
import { DownloadError } from '../../utils/downloadAsDocx/downloadAsDocx'
import Alert from '../Alert/Alert'
import Button from '../Button/Button'

import * as Styled from './styles'

export type Props = {
  level?: string
  duration?: string
  authors?: { data: Data<Author>[] }
  downloadAsDocx: () => Promise<void | DownloadError>
  downloadAsPptx: () => void
}

export default function MetadataContainer({
  level,
  duration,
  authors,
  downloadAsDocx,
  downloadAsPptx,
}: Props) {
  const [docxDownloadIsLoading, setDocxDownloadIsLoading] = useState(false)
  const [docxDowloadErrored, setDocxDownloadErrored] = useState(false)

  const downloadBlock = async () => {
    const delayedLoading = setTimeout(() => setDocxDownloadIsLoading(true), 300)
    const download = await downloadAsDocx()
    if (download?.hasError) {
      setDocxDownloadErrored(true)
    }
    clearTimeout(delayedLoading)
    setDocxDownloadIsLoading(false)
  }

  return (
    <Styled.MetadataContainer>
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
      <Styled.HeadingSet>
        <h6>Download</h6>
        <Styled.DownloadButtonsContainer>
          <Button
            onClick={() => downloadBlock()}
            isLoading={docxDownloadIsLoading}
          >
            DOCX
          </Button>

          <Button onClick={() => downloadAsPptx()}>PPT</Button>
        </Styled.DownloadButtonsContainer>
        {docxDowloadErrored === true ? (
          <Styled.Alert>
            <Alert
              title='The download failed'
              text='Something went wrong when trying to download the DOCX document...'
              type='ERROR'
            />
          </Styled.Alert>
        ) : null}
      </Styled.HeadingSet>
    </Styled.MetadataContainer>
  )
}
