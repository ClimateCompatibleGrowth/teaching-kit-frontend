import React from 'react'
import Card, { CardType } from './Card/Card'

type Props = {
  cards: CardType[]
}

const CardList = ({ cards }: Props) => {
  return (
    <div>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </div>
  )
}

export default CardList
