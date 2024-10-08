import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import Loader from '../Loader/Loader'

import * as Styled from './styles'

type Props = {
  children: ReactNode
  isLoading?: boolean
  primary?: boolean
} & Styled.Props & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, isLoading, primary = true, ...rest }: Props) => {
  return (
    <Styled.Button
      primary={primary}
      aria-live='polite'
      aria-busy={isLoading}
      isLoading={isLoading}
      {...rest}
    >
      {isLoading ? <Loader /> : children}
    </Styled.Button>
  )
}

export default Button
