import React from 'react'
import {
  OnSurfaceAlternative,
  SurfaceAlternative,
} from '../../../styles/global'
import { LearningMaterialType } from '../../../types'

type Props = {
  type: LearningMaterialType
  numberOfResults: number
}

const TabLabel = ({ type, numberOfResults }: Props) => {
  const getTabLabel = (type: LearningMaterialType): string => {
    switch (type) {
      case 'COURSE':
        return 'Courses'
      case 'LECTURE':
        return 'Lectures'
      case 'BLOCK':
        return 'Blocks'
    }
  }

  return (
    <h5 style={{ fontWeight: 300 }}>
      {`${getTabLabel(type)} `}
      <span
        aria-label={`${numberOfResults} results`}
        style={{
          padding: '0.4rem 1rem',
          backgroundColor: SurfaceAlternative,
          color: OnSurfaceAlternative,
          borderRadius: '1.5rem',
        }}
      >
        {numberOfResults}
      </span>
    </h5>
  )
}

export default TabLabel
