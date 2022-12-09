import React from 'react'
import styles from './MetaDataContainer.module.css'
import { Author, Block, LearningMaterialType, Level } from '../../types'
import handleDocxDownload from '../../utils/downloadAsDocx'

type DocxDownloadParameters = {
  title: string
  courseId?: number
  blocks?: Block[]
}

export type Props = {
  typeOfLearningMaterial: LearningMaterialType
  level?: Level
  duration?: string
  authors?: { data: Author[] }
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
    <div id="meta-data-html" className={styles.metaDataContainer}>
      <h3>About this {typeOfLearningMaterial}</h3>
      {level !== undefined && <p>Level: {level}</p>}
      <p>Duration: {duration}</p>
      <h4>Authors</h4>
      <ul className={styles.ul}>
        {authors?.data.map((author: Author) => (
          <li key={author.id}>
            {author.attributes.Name}:{' '}
            <a href={`mailto:${author.attributes.Email}`}>
              {author.attributes.Email}
            </a>
          </li>
        ))}
      </ul>
      <h4>Download</h4>
      <div className={styles.downloadContainer}>
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
      </div>
    </div>
  )
}
