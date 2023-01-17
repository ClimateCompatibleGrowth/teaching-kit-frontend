import React from 'react'
import ReactMarkdown from 'react-markdown'
import { LearningMaterialType } from '../../types'
import SubHeading from './SubHeading'

type Props = {
  markdown: string
  downloadedAs: LearningMaterialType
}

const Abstract = ({ markdown, downloadedAs }: Props) => {
  return (
    <>
      <SubHeading downloadedAs={downloadedAs}>Abstract</SubHeading>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  )
}

export default Abstract
