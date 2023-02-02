import React, { ReactNode } from 'react'
import {
  AccentBrown,
  AccentBrownDarker,
  AccentGreen,
  AccentGreenDarker,
  AccentYellow,
  AccentYellowDarker,
} from '../../styles/global'
import * as Styled from './styles'

type Props = {
  accentColor: 'brown' | 'yellow' | 'green'
  children: ReactNode
}

const Badge = ({ accentColor, children }: Props) => {
  let borderColor, backgroundColor
  switch (accentColor) {
    case 'brown':
      backgroundColor = AccentBrown
      borderColor = AccentBrownDarker
      break
    case 'green':
      backgroundColor = AccentGreen
      borderColor = AccentGreenDarker
      break
    case 'yellow':
      backgroundColor = AccentYellow
      borderColor = AccentYellowDarker
      break
    default:
      break
  }
  return (
    <Styled.Badge borderColor={borderColor} backgroundColor={backgroundColor}>
      {children}
    </Styled.Badge>
  )
}

export default Badge
