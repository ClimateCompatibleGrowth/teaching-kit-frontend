import React from 'react'
import { Author, Block, Data, LearningMaterialType, Level } from '../../types'
import {
  DownloadContainer,
  StyledLi,
  StyledMetaDataContainer,
  StyledUl,
} from './styles'
import handleDocxDownload from '../../utils/downloadAsDocx'

type DocxDownloadParameters = {
  title: string
  courseId?: number
  blocks?: Data<Block>[]
}

export type Props = {
  typeOfLearningMaterial: LearningMaterialType
  level?: Level
  duration?: string
  authors?: { data: Data<Author>[] }
  docxDownloadParameters?: DocxDownloadParameters
  handlePptxDownload?: () => void
}

export default function MetaDataContainer({
  typeOfLearningMaterial,
  level,
  duration,
  authors,
  docxDownloadParameters,
  handlePptxDownload,
}: Props) {
  return (
    <StyledMetaDataContainer id="meta-data-html">
      <h3>About this {typeOfLearningMaterial}</h3>
      {level !== undefined && <p>Level: {level}</p>}
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
        <button onClick={handlePptxDownload}>Pptx</button>
      </DownloadContainer>
    </StyledMetaDataContainer>
  )
}
