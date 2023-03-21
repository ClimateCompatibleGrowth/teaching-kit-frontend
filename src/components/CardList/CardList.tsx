import { useRouter } from 'next/router'
import React from 'react'
import { Locale } from '../../types'
import Card, { CardType } from './Card/Card'
import * as Styled from './styles'
import { translations } from './translations'

type Props = {
  cards: CardType[]
}

const CardList = ({ cards }: Props) => {
  const { locale } = useRouter()

  return (
    <Styled.CardList>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
      {cards.length === 0 && <p>{translations[locale as Locale].noResults}</p>}
    </Styled.CardList>
  )
}

export default CardList
