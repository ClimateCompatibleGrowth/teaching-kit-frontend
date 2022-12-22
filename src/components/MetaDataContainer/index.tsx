import React from 'react'
import {
  Author,
  BlockOneLevelDeep,
  Data,
  LearningMaterialType,
  Level,
} from '../../types'
import {
  DownloadContainer,
  StyledLi,
  StyledMetaDataContainer,
  StyledUl,
} from './styles'
import handleDocxDownload from '../../utils/downloadAsDocx'
import handlePptxDownload from '../../utils/downloadAsPptx'

type DocxDownloadParameters = {
  title: string
  courseId?: number
  blocks?: Data<BlockOneLevelDeep>[]
}

type PptxDownloadParameters = {
  data: Data<BlockOneLevelDeep>
}

export type Props = {
  typeOfLearningMaterial: LearningMaterialType
  level?: Level
  duration?: string
  authors?: { data: Data<Author>[] }
  docxDownloadParameters: DocxDownloadParameters
  pptxDownloadParameters?: PptxDownloadParameters
}

export default function MetaDataContainer({
  typeOfLearningMaterial,
  level,
  duration,
  authors,
  docxDownloadParameters,
  pptxDownloadParameters,
}: Props) {
  return (
    <StyledMetaDataContainer id='meta-data-html'>
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
        {pptxDownloadParameters !== undefined ? (
          <button
            onClick={() => handlePptxDownload(pptxDownloadParameters?.data)}
          >
            Pptx
          </button>
        ) : null}
      </DownloadContainer>
    </StyledMetaDataContainer>
  )
}
