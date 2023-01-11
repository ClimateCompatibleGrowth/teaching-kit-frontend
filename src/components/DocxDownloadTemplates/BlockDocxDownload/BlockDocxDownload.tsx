import React from 'react'
import { BlockOneLevelDeep, Data } from '../../../types'

import * as Styled from '../styles'

export type Props = { block: Data<BlockOneLevelDeep> }

const BlockDocxDownload = ({ block }: Props) => {
  return (
    <Styled.DocxDownloadWrapper>
      <h1>{block.attributes.Title}</h1>
    </Styled.DocxDownloadWrapper>
  )
}

export default BlockDocxDownload
