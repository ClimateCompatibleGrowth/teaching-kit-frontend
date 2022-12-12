import React from 'react'
import { Author, Data, Level } from '../../types'
import {
  DownloadContainer,
  StyledLi,
  StyledMetaDataContainer,
  StyledUl,
} from './styles'

export type Props = {
  typeOfLearningMaterial: string
  level?: Level
  duration?: string
  authors?: { data: Data<Author>[] }
}

export default function MetaDataContainer({
  typeOfLearningMaterial,
  level,
  duration,
  authors,
}: Props) {
  const handleDocxDownload = () => {}

  const handlePptxDownload = () => {}

  return (
    <StyledMetaDataContainer>
      <h3>About this {typeOfLearningMaterial}</h3>
      <p>Level: {level}</p>
      <p>Duration: {duration}</p>
      <h4>Authors</h4>
      <StyledUl>
        {authors?.data.map((author) => (
          <StyledLi key={author.id}>
            {author.attributes.Name}:{' '}
            <a href={`mailto:${author.attributes.Email}`}>
              {author.attributes.Email}
            </a>
          </StyledLi>
        ))}
      </StyledUl>
      <h4>Download</h4>
      <DownloadContainer>
        <button onClick={handleDocxDownload}>Docx</button>
        <button onClick={handlePptxDownload}>Pptx</button>
      </DownloadContainer>
    </StyledMetaDataContainer>
  )
}
