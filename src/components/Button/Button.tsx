import React, { ReactNode } from 'react'

import * as Styled from './styles'

type Props = {
  children: ReactNode
  onClick: () => void
}

const Button = ({ children, onClick }: Props) => {
  return <Styled.Button onClick={onClick}>{children}</Styled.Button>
}

export default Button
