import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { Locale, MediaFiles } from '../../../types'
import Markdown from '../../Markdown/Markdown'
import TranslationDoesNotExist from '../../TranslationDoesNotExist/TranslationDoesNotExist'
import * as Styled from './styles'

export type CardType = {
  id: string
  title: string
  text: string
  href?: string
  files?: MediaFiles
  subTitle?: ReactNode
  subComponent?: ReactNode
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
        {card.files?.data && <Styled.FilesTitle>Lecture files</Styled.FilesTitle>}
        {card.files?.data?.map((file) =>
          <Styled.LectureFile key={file.id} primary href={file.attributes.url} download>{file.attributes.alternativeText || file.attributes.name}</Styled.LectureFile>
        )}
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
