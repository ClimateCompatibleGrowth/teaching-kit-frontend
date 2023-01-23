import React, { ReactNode } from 'react'
import { LearningMaterialType } from '../../types'

type Props = {
  children: ReactNode
  downloadedAs: LearningMaterialType
}

const Heading = ({ children, downloadedAs }: Props) => {
  switch (downloadedAs) {
    case 'BLOCK':
      return <h1>{children}</h1>
    case 'LECTURE':
      return <h2>{children}</h2>
    case 'COURSE':
      return <h3>{children}</h3>
  }
}

export default Heading
