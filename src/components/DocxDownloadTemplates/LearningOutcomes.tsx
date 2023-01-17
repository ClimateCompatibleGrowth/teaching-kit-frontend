import React from 'react'
import { LearningOutcome } from '../../types'

type Props = {
  learningOutcomes: LearningOutcome[]
}

const LearningOutcomes = ({ learningOutcomes }: Props) => {
  return (
    <ul>
      {learningOutcomes.map((learningOutcome, index) => (
        <li key={index}>{learningOutcome.LearningOutcome}</li>
      ))}
    </ul>
  )
}

export default LearningOutcomes
