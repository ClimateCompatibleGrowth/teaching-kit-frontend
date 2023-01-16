import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { BlockOneLevelDeep, Data, LearningMaterialType } from '../../../types'
import { summarizeDurations } from '../../../utils/utils'

export type Props = {
  block: Data<BlockOneLevelDeep>
  downloadedAs: LearningMaterialType
}

const BlockDocxDownload = ({ block, downloadedAs }: Props) => {
  const Heading = ({ children }: { children: ReactNode }) => {
    switch (downloadedAs) {
      case 'BLOCK':
        return <h1>{children}</h1>
      case 'LECTURE':
        return <h2>{children}</h2>
      case 'COURSE':
        return <h3>{children}</h3>
    }
  }

  const SubHeading = ({ children }: { children: ReactNode }) => {
    switch (downloadedAs) {
      case 'BLOCK':
        return <h2>{children}</h2>
      case 'LECTURE':
        return <h3>{children}</h3>
      case 'COURSE':
        return <h4>{children}</h4>
    }
  }

  return (
    <div>
      <Heading>{block.attributes.Title}</Heading>
      {block.attributes.Authors.data !== undefined &&
      block.attributes.Authors.data.length > 0 ? (
        <p>
          Author(s):{'   '}
          {block.attributes.Authors.data
            .map((author) => author.attributes.Name)
            .join(', ')}
        </p>
      ) : null}
      {block.attributes.DurationInMinutes !== undefined ? (
        <p>Duration: {summarizeDurations([block])}</p>
      ) : null}
      <SubHeading>Abstract</SubHeading>
      <ReactMarkdown>{block.attributes.Abstract}</ReactMarkdown>
      <ul>
        {block.attributes.LearningOutcomes.map((learningOutcome, index) => (
          <li key={index}>{learningOutcome.LearningOutcome}</li>
        ))}
      </ul>
      <ReactMarkdown>{block.attributes.Document}</ReactMarkdown>
      {block.attributes.References !== undefined ? (
        <>
          <SubHeading>References</SubHeading>
          <p>{block.attributes.References}</p>
        </>
      ) : null}
    </div>
  )
}

export default BlockDocxDownload
