import React, { ReactNode } from 'react'
import { LearningMaterialType } from '../../types'

type Props = {
  children: ReactNode
  downloadedAs: LearningMaterialType
}

const SubHeading = ({ children, downloadedAs }: Props) => {
  switch (downloadedAs) {
    case 'BLOCK':
      return <h2>{children}</h2>
    case 'LECTURE':
      return <h3>{children}</h3>
    case 'COURSE':
      return <h4>{children}</h4>
  }
}

export default SubHeading
