import React from 'react'
import { BlockOneLevelDeep, Data } from '../../types'
import { summarizeDurations } from '../../utils/utils'

type Props = {
  blocks: Data<BlockOneLevelDeep>[]
}

const Duration = ({ blocks }: Props) => {
  return <p>Duration: {summarizeDurations(blocks)}</p>
}

export default Duration
