import React from 'react'

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
    <div>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      <p>{card.metaData}</p>
    </div>
  )
}

export default Card
