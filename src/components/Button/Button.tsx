import React, { ReactNode } from 'react'
import Loader from '../Loader/Loader'

import * as Styled from './styles'

type Props = {
  children: ReactNode
  onClick: () => void
  isLoading?: boolean
}

const Button = ({ children, onClick, isLoading }: Props) => {
  return (
    <Styled.Button onClick={onClick} aria-live='polite' aria-busy={isLoading}>
      {isLoading === true ? <Loader /> : children}
    </Styled.Button>
  )
}

export default Button
