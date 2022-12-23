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
        Title={block.attributes.Title}
        Abstract={block.attributes.Abstract}
        LearningOutcomes={block.attributes.LearningOutcomes}
      />
      <LearningMaterialEnding References={block.attributes.References} />
    </LearningMaterialOverview>
  )
}
