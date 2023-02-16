import { CircularProgress } from '@mui/material'
import React from 'react'

import * as Styled from './styles'

type Props = {
  loadingText?: string
}

const Loader = ({ loadingText }: Props) => {
  return (
    <Styled.Spinner>
      {loadingText !== undefined && (
        <Styled.LoaderInfo>{loadingText}</Styled.LoaderInfo>
      )}
      <CircularProgress color='inherit' size={21} />
    </Styled.Spinner>
  )
}

export default Loader
