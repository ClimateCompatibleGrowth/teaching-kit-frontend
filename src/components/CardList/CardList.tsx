import React from 'react'
import Card, { CardType } from './Card/Card'
import * as Styled from './styles'

type Props = {
  cards: CardType[]
}

const CardList = ({ cards }: Props) => {
  return (
    <Styled.CardList>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </Styled.CardList>
  )
}

export default CardList
