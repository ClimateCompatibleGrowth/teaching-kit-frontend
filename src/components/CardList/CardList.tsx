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
      {cards.length === 0 && <p>No results for the current filter.</p>}
    </Styled.CardList>
  )
}

export default CardList
