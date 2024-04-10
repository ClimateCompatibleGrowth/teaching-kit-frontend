import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { Locale } from '../../../types'
import Markdown from '../../Markdown/Markdown'
import TranslationDoesNotExist from '../../TranslationDoesNotExist/TranslationDoesNotExist'
import * as Styled from './styles'

export type CardType = {
  id: string
  title: string
  text: string
  href?: string
  subTitle?: ReactNode
  subComponent?: ReactNode
  duration?: ReactNode
  level?: ReactNode
  locale?: Locale
  translationDoesNotExistCopy: string
  index?: number
}

type CardProps = {
  card: CardType
  currentIndex?: number
  setCurrentIndex?: (index: number) => void
}

const Card = ({ card, currentIndex, setCurrentIndex }: CardProps) => {
  const { locale: routerLocale } = useRouter()
  const [youAreHere, setYouAreHere] = useState(false)

  useEffect(() => {
    if (typeof currentIndex === 'number' && currentIndex === card.index) {
      setYouAreHere(true)
    } else {
      setYouAreHere(false)
    }
  }, [currentIndex, card.index])

  const handleDirectClick = () => {
    if (typeof card.index === 'number') {
      const index: number = card.index
      setCurrentIndex?.(index)
    }
  }

  return (
    <LinkWrapper card={card}>
      <Styled.Card
        isInteractive={!!card.href}
        youAreHere={youAreHere}
        onClick={handleDirectClick}
      >
        {card.locale !== undefined && card.locale !== routerLocale ? (
          <TranslationDoesNotExist copy={card.translationDoesNotExistCopy} />
        ) : null}

        {typeof card.subTitle === 'string' ? (
          <Styled.SubTitle>{card.subTitle}</Styled.SubTitle>
        ) : null}

        <Styled.YouAreHereWrapper>
          {typeof card.subTitle === 'object' && (
            <Styled.SubTitleNode youAreHere={youAreHere}>
              {card.subTitle}
              <Styled.Indicator youAreHere={youAreHere}>
                You are here
              </Styled.Indicator>
            </Styled.SubTitleNode>
          )}
        </Styled.YouAreHereWrapper>

        <Styled.Title>{card.title}</Styled.Title>
        <Styled.Markdown>
          <Markdown allowedElements={['p']}>{card.text}</Markdown>
        </Styled.Markdown>
        <Styled.MetaInformation>
          {card.level && <Styled.MetaData>{card.level}</Styled.MetaData>}
          {card.duration && <Styled.MetaData>{card.duration}</Styled.MetaData>}
        </Styled.MetaInformation>
        {card.subComponent !== undefined ? (
          <Styled.SubComponentWrapper>
            <hr />
            {card.subComponent}
          </Styled.SubComponentWrapper>
        ) : null}
      </Styled.Card>
    </LinkWrapper>
  )
}

type LinkProps = {
  card: CardType
  children: JSX.Element
}

const LinkWrapper = ({ card, children }: LinkProps) => {
  return card.href !== undefined ? (
    <Styled.NextLink href={card.href}>{children}</Styled.NextLink>
  ) : (
    children
  )
}

export default Card
