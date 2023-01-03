import React from 'react'
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
    <>
      <h5>{getTabLabel(type)}</h5>
      <div className='NumberOfMatchesWrapper'>
        <h5 aria-label={`${numberOfResults} matching results`}>
          {numberOfResults}
        </h5>
      </div>
    </>
  )
}

export default TabLabel
