import React from 'react'
import LearningMaterial from '../LearningMaterial'
import LearningMaterialEnding from '../LearningMaterialEnding'
import { BlockOneLevelDeep, Data } from '../../types'
import { LearningMaterialOverview } from '../../styles/global'

export type Props = { block: Data<BlockOneLevelDeep> }

export const Block = ({ block }: Props) => {
  return (
    <LearningMaterialOverview id='source-html'>
      <LearningMaterial
        type='BLOCK'
        title={block.attributes.Title}
        abstract={block.attributes.Abstract}
        learningOutcomes={block.attributes.LearningOutcomes}
      />
      <LearningMaterialEnding References={block.attributes.References} />
    </LearningMaterialOverview>
  )
}
