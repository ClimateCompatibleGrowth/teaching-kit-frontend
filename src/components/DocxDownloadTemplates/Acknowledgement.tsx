import React from 'react'
import { LearningMaterialType } from '../../types'
import SubHeading from './SubHeading'

type Props = {
  acknowledgement: string
  downloadedAs: LearningMaterialType
}

const Acknowledgement = ({ acknowledgement, downloadedAs }: Props) => {
  return acknowledgement !== undefined ? (
    <>
      <SubHeading downloadedAs={downloadedAs}>Acknowledgement</SubHeading>
      <p>{acknowledgement}</p>
    </>
  ) : null
}

export default Acknowledgement
