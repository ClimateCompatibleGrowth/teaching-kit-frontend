import React from 'react'
import { LearningMaterialType } from '../../types'
import SubHeading from './SubHeading'
import Document from './Document'

type Props = {
  markdown: string
  downloadedAs: LearningMaterialType
}

const Abstract = ({ markdown, downloadedAs }: Props) => {
  return (
    <>
      <SubHeading downloadedAs={downloadedAs}>Abstract</SubHeading>
      <Document markdown={markdown} />
    </>
  )
}

export default Abstract
