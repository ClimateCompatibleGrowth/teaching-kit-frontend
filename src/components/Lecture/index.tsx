import React from 'react'
import LearningMaterial from '../LearningMaterial'
import LearningMaterialEnding from '../LearningMaterialEnding'
import styles from '../../styles/LearningMaterial.module.css'
import { Lecture as LectureType } from '../../types'
import Blocks from '../Block/DropDownView'

export type Props = {lecture: LectureType }

export const Lecture = ({ lecture }: Props) => {
  return (
      <div id="source-html" className={styles.learningMaterialOverview}>
        <LearningMaterial
          Title={lecture.attributes.Title}
          Abstract={lecture.attributes.Abstract}
          LearningOutcomes={lecture.attributes.LearningOutcomes}
        />
        <h2>Lecture content</h2>
        {lecture.attributes.Blocks && (
          <Blocks blocks={lecture.attributes.Blocks.data} />
        )}
        <LearningMaterialEnding
          Acknowledgment={lecture.attributes.Acknowledgement}
          CiteAs={lecture.attributes.CiteAs}
        />
      </div>
  )
}
