import { CircularProgress } from '@mui/material'
import React from 'react'

import * as Styled from './styles'

type Props = {
  loadingText?: string
}

const Loader = ({ loadingText }: Props) => {
  return (
    <Styled.Spinner>
      {loadingText !== undefined ? (
        <Styled.LoaderInfo>{loadingText}</Styled.LoaderInfo>
      ) : null}
      <div>
        <CircularProgress size={15} />
      </div>
    </Styled.Spinner>
  )
}

export default Loader
