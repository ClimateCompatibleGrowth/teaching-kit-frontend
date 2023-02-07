import React from 'react'
import { LearningMaterialType } from '../../types'
import Markdown from '../Markdown/Markdown'
import SubHeading from './SubHeading'

type Props = {
  markdown: string
  downloadedAs: LearningMaterialType
}

const Abstract = ({ markdown, downloadedAs }: Props) => {
  return (
    <>
      <SubHeading downloadedAs={downloadedAs}>Abstract</SubHeading>
      <Markdown>{markdown}</Markdown>
    </>
  )
}

export default Abstract
