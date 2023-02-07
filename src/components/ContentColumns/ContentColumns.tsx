import React from 'react'
import ReactMarkdown from 'react-markdown'
import { PageContainer } from '../../styles/global'
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
            <ReactMarkdown>{content}</ReactMarkdown>
          </Styled.Column>
        ))}
      </Styled.Wrapper>
    </PageContainer>
  )
}

export default ContentColumns
