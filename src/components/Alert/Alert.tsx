import React, { ReactNode } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import * as Styled from './styles'

type Props = {
  title: string
  text: string
  type: AlertType
}

const alertTypes = ['INFORMATION', 'SUCCESS', 'WARNING', 'ERROR'] as const
type AlertType = typeof alertTypes[number]

const Alert = ({ title, text, type }: Props) => {
  const getTitleIcon = (type: AlertType): ReactNode => {
    switch (type) {
      case 'ERROR':
      default:
        return <ErrorOutlineIcon />
    }
  }
  return (
    <Styled.Wrapper>
      <Styled.HeaderWrapper>
        <Styled.Icon>{getTitleIcon(type)}</Styled.Icon>
        <Styled.Title>{title}</Styled.Title>
      </Styled.HeaderWrapper>
      <Styled.Text>{text}</Styled.Text>
    </Styled.Wrapper>
  )
}

export default Alert
