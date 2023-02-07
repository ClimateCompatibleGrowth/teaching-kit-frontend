import React, { ReactNode } from 'react'
import Markdown from '../../Markdown/Markdown'
import * as Styled from './styles'

export type PosterType = {
  id: string
  title: string
  text: string
  subTitle?: ReactNode
  metadata?: string
  subComponent?: ReactNode
}

type Props = {
  poster: PosterType
}

const Poster = ({ poster }: Props) => {
  return (
    <Styled.Card>
      {typeof poster.subTitle === 'string' && (
        <Styled.SubTitle>{poster.subTitle}</Styled.SubTitle>
      )}
      {typeof poster.subTitle === 'object' && poster.subTitle}
      <Styled.Title>{poster.title}</Styled.Title>
      <Styled.Markdown>
        <Markdown>{poster.text}</Markdown>
      </Styled.Markdown>
      <Styled.Metadata>{poster.metadata}</Styled.Metadata>
      {poster.subComponent && (
        <Styled.SubComponentWrapper>
          <hr />
          {poster.subComponent}
        </Styled.SubComponentWrapper>
      )}
    </Styled.Card>
  )
}

export default Poster
