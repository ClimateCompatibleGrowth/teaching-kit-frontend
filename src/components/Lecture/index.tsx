import React from 'react'
import LearningMaterial from '../LearningMaterial'
import LearningMaterialEnding from '../LearningMaterialEnding'
import { Data, LectureWithBlock } from '../../types'
import Blocks from '../Block/DropDownView'
import { LearningMaterialOverview } from '../../styles/global'

export type Props = { lecture: Data<LectureWithBlock> }

export const Lecture = ({ lecture }: Props) => {
  return (
    <LearningMaterialOverview id="source-html">
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
    </LearningMaterialOverview>
  )
}
