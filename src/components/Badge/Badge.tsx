import React, { ReactNode } from 'react'
import * as Styled from './styles'

type Props = {
  accentColor: string
  children: ReactNode
}

const Badge = ({ accentColor, children }: Props) => {
  return <Styled.Badge accentColor={accentColor}>{children}</Styled.Badge>
}

export default Badge
