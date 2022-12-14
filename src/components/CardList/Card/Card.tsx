import React from 'react'
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
      <p>{card.text}</p>
      <Styled.MetaData>{card.metaData}</Styled.MetaData>
    </Styled.Card>
  )
}

export default Card
