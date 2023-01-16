import React from 'react'
import { BlockOneLevelDeep, Data } from '../../../types'

import handlePptxDownload from '../../../utils/downloadAsPptx'
import Button from '../../Button/Button'

type Props = {
  block: Data<BlockOneLevelDeep>
  lecture: any
}

// This component was only made in order to be able to be dynamically imported from the MetadataContainer component,
// in order to solve a hydration error in production
const PowerPointDownloadButton = ({ block, lecture }: Props) => {
  return (
    <Button onClick={() => handlePptxDownload(block, lecture)}>Pptx</Button>
  )
}

export default PowerPointDownloadButton
