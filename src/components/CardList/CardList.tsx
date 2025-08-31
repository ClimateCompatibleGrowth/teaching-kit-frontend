import { useRouter } from 'next/router'
import React from 'react'
import { Locale } from '../../types'
import Card, { CardType } from './Card/Card'
import * as Styled from './styles'
import { translations } from './translations'

type CardListProps = {
  cards: CardType[]
  currentIndex?: number
  setCurrentIndex?: (index: number) => void
}

const CardList = ({ cards, currentIndex, setCurrentIndex }: CardListProps) => {
  const { locale } = useRouter()
  return (
    
    <Styled.CardList>
      {cards.map((card) => (
        <Card
          card={card}
          key={card.id}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      ))}
      {cards.length === 0 && <p>{translations[locale as Locale].noResults}</p>}
    </Styled.CardList>
  )
}

export default CardList
