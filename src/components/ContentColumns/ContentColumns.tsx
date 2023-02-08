import React from 'react'
import { PageContainer } from '../../styles/global'
import Markdown from '../Markdown/Markdown'
import * as Styled from './styles'

type Column = {
  content: string
}

type Props = {
  columns: Column[]
}

const ContentColumns = ({ columns }: Props) => {
  return (
    <PageContainer hasSmallSidePadding>
      <Styled.Wrapper>
        {columns.map(({ content }) => (
          <Styled.Column key={content}>
            <Markdown>{content}</Markdown>
          </Styled.Column>
        ))}
      </Styled.Wrapper>
    </PageContainer>
  )
}

export default ContentColumns
