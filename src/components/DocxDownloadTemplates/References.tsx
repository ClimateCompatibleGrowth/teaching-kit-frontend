import React from 'react'
import { LearningMaterialType } from '../../types'
import SubHeading from './SubHeading'

type Props = {
  references: string
  downloadedAs: LearningMaterialType
}

const References = ({ references, downloadedAs }: Props) => {
  return references !== undefined ? (
    <>
      <SubHeading downloadedAs={downloadedAs}>References</SubHeading>
      <p>{references}</p>
    </>
  ) : null
}

export default References
