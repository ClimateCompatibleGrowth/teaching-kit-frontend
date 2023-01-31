import React, { ReactNode } from 'react'
import { AccentBlue, AccentGreen, AccentYellow } from '../../../styles/global'
import { LearningMaterialType } from '../../../types'
import Badge from '../../Badge/Badge'

type ElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type Props = {
  type: LearningMaterialType
  elementType?: ElementType
}

const learningMaterialColors = {
  course: AccentBlue,
  lecture: AccentGreen,
  block: AccentYellow,
}

const LearningMaterialBadge = ({ type, elementType }: Props) => {
  const getBadgeContent = (
    label: string,
    elementType?: ElementType
  ): ReactNode => {
    switch (elementType) {
      case 'h1':
        return <h1>{label}</h1>
      case 'h2':
        return <h2>{label}</h2>
      case 'h3':
        return <h3>{label}</h3>
      case 'h4':
        return <h4>{label}</h4>
      case 'h5':
        return <h5>{label}</h5>
      case 'h6':
        return <h6>{label}</h6>
      default:
        return label
    }
  }

  switch (type) {
    case 'BLOCK':
      return (
        <Badge accentColor={learningMaterialColors.block}>
          {getBadgeContent('Lecture block', elementType)}
        </Badge>
      )
    case 'LECTURE':
      return (
        <Badge accentColor={learningMaterialColors.lecture}>
          {getBadgeContent('Lecture', elementType)}
        </Badge>
      )
    case 'COURSE':
      return (
        <Badge accentColor={learningMaterialColors.course}>
          {getBadgeContent('Course', elementType)}
        </Badge>
      )
  }
}

export default LearningMaterialBadge
