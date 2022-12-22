import React from 'react'
import ReactMarkdown from 'react-markdown'
import * as Styled from './styles'

export type CardType = {
  id: string
  title: string
  text: string
  metaData: string
}

type Props = {
  card: CardType
}

const Card = ({ card }: Props) => {
  return (
    <Styled.Card>
      <h4>{card.title}</h4>
      <Styled.Markdown>
        <ReactMarkdown>{card.text}</ReactMarkdown>
      </Styled.Markdown>
      <Styled.MetaData>{card.metaData}</Styled.MetaData>
    </Styled.Card>
  )
}

export default Card
