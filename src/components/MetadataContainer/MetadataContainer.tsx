import Link from 'next/link'
import React from 'react'
import {
  Author,
  CourseOneLevelDeep,
  LandingPageCopy,
  Data,
  Lecture,
  MediaFiles,
  MediaFile,
} from '../../types'

import * as Styled from './styles'
import ButtonLink from '../ButtonLink/ButtonLink'

export type Props = {
  citeAs?: string
  acknowledgment?: string
  files?: MediaFiles
  logo?: MediaFile
  authors?: { data: Data<Author>[] }
  parentRelations?: {
    type: 'lectures' | 'courses'
    parents: Data<CourseOneLevelDeep>[] | Data<Lecture>[]
  }
  landingPageCopy: LandingPageCopy
}

export default function MetadataContainer({
  acknowledgment,
  citeAs,
  files,
  logo,
  authors,
  parentRelations,
  landingPageCopy,
}: Props) {
  return (
    <Styled.MetadataContainer>
      {logo && <Styled.Logo src={logo?.data.attributes.url} />}
      {parentRelations && (
        <Styled.HeadingSet>
          <Styled.Heading>{landingPageCopy.AlsoPartOf}</Styled.Heading>
          {parentRelations.parents.map((parent) => (
            <div key={parent.id}>
              <Link href={`/${parentRelations.type}/${parent.attributes.vuid}`}>
                {parent.attributes.Title}
              </Link>{' '}
            </div>
          ))}
        </Styled.HeadingSet>
      )}
      {authors?.data?.length !== undefined && authors?.data?.length > 0 && (
        <Styled.HeadingSet>
          <Styled.Heading>{landingPageCopy.Authors}</Styled.Heading>
          <Styled.Ul>
            {authors?.data.map((author) => (
              <Styled.Li key={author.id}>
                <Styled.EmailIcon />
                <a href={`mailto:${author.attributes.Email}`}>
                  {author.attributes.FirstName} {author.attributes.LastName}
                </a>
              </Styled.Li>
            ))}
          </Styled.Ul>
        </Styled.HeadingSet>
      )}
      {acknowledgment && (
        <Styled.HeadingSet>
          <Styled.Heading>{landingPageCopy.Acknowledgement}</Styled.Heading>
          {acknowledgment}
        </Styled.HeadingSet>
      )}
      {citeAs && (
        <Styled.HeadingSet>
          <Styled.Heading>{landingPageCopy.CiteAs}</Styled.Heading>
          {citeAs}
        </Styled.HeadingSet>
      )}
      <Styled.HeadingSet>
        <Styled.Heading>{landingPageCopy.DownloadContent}</Styled.Heading>
        <Styled.Ul>
          {files?.data && files.data.map(file =>
            <Styled.Li>
              <ButtonLink primary download href={file.attributes.url}>{file.attributes.alternativeText || file.attributes.name}</ButtonLink>
            </Styled.Li>
          )}
        </Styled.Ul>
      </Styled.HeadingSet>
    </Styled.MetadataContainer>
  )
}
