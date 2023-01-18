import React from 'react'
import { LearningOutcome } from '../../types'

type Props = {
  learningOutcomes: LearningOutcome[]
}

const LearningOutcomes = ({ learningOutcomes }: Props) => {
  return learningOutcomes !== undefined ? (
    <ul>
      {learningOutcomes.map((learningOutcome, index) => (
        <li key={index}>{learningOutcome.LearningOutcome}</li>
      ))}
    </ul>
  ) : null
}

export default LearningOutcomes
