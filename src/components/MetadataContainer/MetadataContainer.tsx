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
  docxFileSize: string
  pptxFileSize?: string
  downloadAsDocx: () => Promise<void | DownloadError>
  downloadAsPptx?: () => Promise<void | DownloadError>
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
  docxFileSize,
  pptxFileSize,
  downloadAsDocx,
  downloadAsPptx,
  parentRelations,
  type,
}: Props) {
  const [isDocxDownloadLoading, setIsDocxDownloadLoading] = useState(false)
  const [docxDowloadError, setDocxDownloadError] = useState(false)
  const [isPptxDownloadLoading, setIsPptxDownloadLoading] = useState(false)
  const [pptxDowloadError, setPptxDownloadError] = useState(false)

  const docxDownloadHandler = async () => {
    const delayedLoading = setTimeout(() => setIsDocxDownloadLoading(true), 300)
    const download = await downloadAsDocx()
    if (download?.hasError) {
      setDocxDownloadError(true)
    }
    clearTimeout(delayedLoading)
    setIsDocxDownloadLoading(false)
  }

  const pptxDownloadHandler = async () => {
    if (downloadAsPptx) {
      const delayedLoading = setTimeout(
        () => setIsPptxDownloadLoading(true),
        300
      )
      const download = await downloadAsPptx()
      if (download?.hasError) {
        setPptxDownloadError(true)
      }
      clearTimeout(delayedLoading)
      setIsPptxDownloadLoading(false)
    }
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
          <Button
            onClick={docxDownloadHandler}
            isLoading={isDocxDownloadLoading}
          >
            <Styled.DownloadIcon />
            Docx
          </Button>
          <Styled.DownloadSize>{`Docx file size is ${docxFileSize}`}</Styled.DownloadSize>

          {downloadAsPptx && (
            <>
              <Button
                onClick={pptxDownloadHandler}
                isLoading={isPptxDownloadLoading}
              >
                <Styled.DownloadIcon />
                Powerpoint
              </Button>
              <Styled.DownloadSize>{`Powerpoint file size is ${pptxFileSize}`}</Styled.DownloadSize>
            </>
          )}
        </Styled.DownloadButtonsContainer>
        {(docxDowloadError || pptxDowloadError) && (
          <Styled.Alert>
            <Alert
              title='The download failed'
              text={`Something went wrong when trying to download the ${
                docxDowloadError ? 'Docx' : 'powerpoint'
              } document...`}
              type='ERROR'
            />
          </Styled.Alert>
        )}
      </Styled.HeadingSet>
    </Styled.MetadataContainer>
  )
}
