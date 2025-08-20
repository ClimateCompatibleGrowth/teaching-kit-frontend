import Link from 'next/link'
import React from 'react'
import {
  Author,
  AuthorOneLevelDeep,
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
  courseCreators?: { data: Data<AuthorOneLevelDeep>[] }
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
  courseCreators,
  parentRelations,
  landingPageCopy,
}: Props) {

  
  if ((!courseCreators?.data || courseCreators?.data.length === 0) && !acknowledgment && !citeAs && !files?.data) {
    return null
  }
 
  return (
    <Styled.MetadataContainer>
      {logo?.data?.attributes?.url && <Styled.Logo src={logo?.data.attributes.url} />}
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
      {courseCreators?.data?.length !== undefined && courseCreators?.data?.length > 0 && (
        <Styled.HeadingSet>
          <Styled.Heading>{landingPageCopy.Authors}</Styled.Heading>
          <Styled.Ul>
            {courseCreators?.data.map((author) => (
              <Styled.Li key={author.id}>
                <Styled.EmailIcon />
                <a href={`mailto:${author.attributes.Email}`}>
                  {author.attributes.FirstName} {author.attributes.LastName}
                </a>
                {author.attributes.Affiliation?.data?.attributes?.Affiliation && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <strong>Affiliation:</strong> {author.attributes.Affiliation.data.attributes.Affiliation}
                  </div>
                )}
                {author.attributes.ORCID && /\d/.test(author.attributes.ORCID) && (
                  <div style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
                    <strong>ORCID:</strong> {author.attributes.ORCID.replace(/\D/g, '')}
                  </div>
                )}
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
      {files?.data && <Styled.HeadingSet>
        <Styled.Heading>{landingPageCopy.DownloadContent}</Styled.Heading>
        <Styled.Ul>
          {files.data.map(file =>
            <Styled.Li key={file.id}>
              <ButtonLink primary download href={file.attributes.url}>{file.attributes.alternativeText || file.attributes.name}</ButtonLink>
            </Styled.Li>
          )}
        </Styled.Ul>
      </Styled.HeadingSet>}
    </Styled.MetadataContainer>
  )
}
