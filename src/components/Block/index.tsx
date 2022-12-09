import React from 'react'
import LearningMaterial from '../LearningMaterial'
import LearningMaterialEnding from '../LearningMaterialEnding'
import styles from '../../styles/LearningMaterial.module.css'
import { Block as BlockType } from '../../types'

export type Props = { block: BlockType }

export const Block = ({ block }: Props) => {
  return (
    <div id="source-html" className={styles.learningMaterialOverview}>
      <LearningMaterial
        Title={block.attributes.Title}
        Abstract={block.attributes.Abstract}
        LearningOutcomes={block.attributes.LearningOutcomes}
      />
      <LearningMaterialEnding References={block.attributes.References} />
    </div>
  )
}
