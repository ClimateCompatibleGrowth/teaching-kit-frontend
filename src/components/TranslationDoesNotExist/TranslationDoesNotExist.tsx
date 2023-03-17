import React from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import * as Styled from './styles'

type Props = {
  copy: string
}

const TranslationDoesNotExist = ({ copy }: Props) => {
  return (
    <Styled.Wrapper>
      <InfoOutlinedIcon fontSize='large' />
      <Styled.Text>{copy}</Styled.Text>
    </Styled.Wrapper>
  )
}

export default TranslationDoesNotExist
