import Link from 'next/link'
import React, { useState } from 'react'
import {
  Author,
  CourseOneLevelDeep,
  Data,
  LearningMaterialType,
  Lecture,
  Level,
} from '../../types'
import { DownloadError } from '../../utils/downloadAsDocx/downloadAsDocx'
import { levelToString, typeToDownloadLabel } from '../../utils/utils'
import Alert from '../Alert/Alert'
import Button from '../Button/Button'

import * as Styled from './styles'

export type Props = {
  level?: { data?: Data<Level> }
  duration?: string
  authors?: { data: Data<Author>[] }
  downloadAsDocx: () => Promise<void | DownloadError>
  downloadAsPptx: () => void
  parentRelations?: {
    type: 'lectures' | 'courses'
    parents: Data<CourseOneLevelDeep>[] | Data<Lecture>[]
  }
  type: LearningMaterialType
}

export default function MetadataContainer({
  level,
  duration,
  authors,
  downloadAsDocx,
  downloadAsPptx,
  parentRelations,
  type,
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
      <Styled.HeadingSet>
        {!!level?.data && (
          <Styled.ShortInfo>
            <Styled.SignalStrengthIcon />
            {levelToString(level)}
          </Styled.ShortInfo>
        )}
        {duration !== undefined && (
          <Styled.ShortInfo>
            <Styled.ClockIcon />
            {duration}
          </Styled.ShortInfo>
        )}
      </Styled.HeadingSet>
      {parentRelations && (
        <Styled.HeadingSet>
          <Styled.Heading>Also part of</Styled.Heading>
          {parentRelations.parents.map((parent) => (
            <div key={parent.id}>
              <Link href={`/${parentRelations.type}/${parent.id}`}>
                {parent.attributes.Title}
              </Link>{' '}
            </div>
          ))}
        </Styled.HeadingSet>
      )}
      {authors?.data?.length !== undefined && authors?.data?.length > 0 && (
        <Styled.HeadingSet>
          <Styled.Heading>Authors</Styled.Heading>
          <Styled.Ul>
            {authors?.data.map((author) => (
              <Styled.Li key={author.id}>
                <Styled.EmailIcon />
                <a href={`mailto:${author.attributes.Email}`}>
                  {author.attributes.Name}
                </a>
              </Styled.Li>
            ))}
          </Styled.Ul>
        </Styled.HeadingSet>
      )}
      <Styled.HeadingSet>
        <Styled.Heading>{typeToDownloadLabel(type)}</Styled.Heading>
        <Styled.DownloadButtonsContainer>
          <Button onClick={downloadBlock} isLoading={docxDownloadIsLoading}>
            <Styled.DownloadIcon />
            Docx
          </Button>

          <Button onClick={downloadAsPptx}>
            <Styled.DownloadIcon />
            Powerpoint
          </Button>
        </Styled.DownloadButtonsContainer>
        {docxDowloadErrored === true && (
          <Styled.Alert>
            <Alert
              title='The download failed'
              text='Something went wrong when trying to download the Docx document...'
              type='ERROR'
            />
          </Styled.Alert>
        )}
      </Styled.HeadingSet>
    </Styled.MetadataContainer>
  )
}
