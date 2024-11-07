import { useRouter } from 'next/router'
import React from 'react'
import {
  OnSurfaceAlternative,
  SurfaceAlternative,
} from '../../../styles/global'
import { LearningMaterialType, Locale } from '../../../types'

type Props = {
  type: LearningMaterialType
  numberOfResults: number
}

const TabLabel = ({ type, numberOfResults }: Props) => {
  const { locale } = useRouter()
  const getTabLabel = (type: LearningMaterialType, locale: Locale): string => {
    switch (type) {
      case 'COURSE':
        if (locale === 'es-ES') return 'Cursos'
        return 'Courses'
      case 'LECTURE':
        if (locale === 'es-ES') return 'Conferencias'
        return 'Lectures'
    }
  }

  return (
    <h5 style={{ fontWeight: 300 }}>
      {`${getTabLabel(type, locale as Locale)} `}
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
