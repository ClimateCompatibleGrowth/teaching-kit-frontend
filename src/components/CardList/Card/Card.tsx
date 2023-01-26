import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import * as Styled from './styles'

export type CardType = {
  id: string
  title: string
  text: string
  subTitle?: string
  metadata?: string
  subComponent?: ReactNode
}

type Props = {
  card: CardType
}

const Card = ({ card }: Props) => {
  return (
    <Styled.Card>
      {card.subTitle !== undefined ? (
        <Styled.SubTitle>{card.subTitle}</Styled.SubTitle>
      ) : null}
      <Styled.Title>{card.title}</Styled.Title>
      <Styled.Markdown>
        <ReactMarkdown>{card.text}</ReactMarkdown>
      </Styled.Markdown>
      {card.metadata !== undefined ? (
        <Styled.Metadata>{card.metadata}</Styled.Metadata>
      ) : null}
      {card.subComponent !== undefined ? (
        <Styled.SubComponentWrapper>
          <hr />
          {card.subComponent}
        </Styled.SubComponentWrapper>
      ) : null}
    </Styled.Card>
  )
}

export default Card
