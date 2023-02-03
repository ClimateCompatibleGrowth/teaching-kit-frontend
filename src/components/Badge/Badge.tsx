import React, { ReactNode } from 'react'
import {
  AccentGreen,
  AccentGreenDarker,
  AccentPink,
  AccentPinkDarker,
  AccentYellow,
  AccentYellowDarker,
} from '../../styles/global'
import * as Styled from './styles'

export type BadgeColor = 'pink' | 'yellow' | 'green'

type Props = {
  accentColor: BadgeColor
  children: ReactNode
}

const Badge = ({ accentColor, children }: Props) => {
  let borderColor, backgroundColor
  switch (accentColor) {
    case 'pink':
      backgroundColor = AccentPink
      borderColor = AccentPinkDarker
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
