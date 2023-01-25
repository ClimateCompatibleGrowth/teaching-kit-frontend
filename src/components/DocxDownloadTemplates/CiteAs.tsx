import React from 'react'
import { LearningMaterialType } from '../../types'
import SubHeading from './SubHeading'

type Props = {
  citeAs: string
  downloadedAs: LearningMaterialType
}

const CiteAs = ({ citeAs, downloadedAs }: Props) => {
  return citeAs !== undefined ? (
    <>
      <SubHeading downloadedAs={downloadedAs}>Cite as</SubHeading>
      <p>{citeAs}</p>
    </>
  ) : null
}

export default CiteAs
