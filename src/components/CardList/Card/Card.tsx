import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
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
}

type Props = {
  card: CardType
}

const Card = ({ card }: Props) => {
  const { locale: routerLocale } = useRouter()
  return (
    <LinkWrapper card={card}>
      <Styled.Card isInteractive={!!card.href}>
        {card.locale !== undefined && card.locale !== routerLocale ? (
          <TranslationDoesNotExist copy={card.translationDoesNotExistCopy} />
        ) : null}
        {typeof card.subTitle === 'string' ? (
          <Styled.SubTitle>{card.subTitle}</Styled.SubTitle>
        ) : null}
        {typeof card.subTitle === 'object' && (
          <Styled.SubTitleNode>{card.subTitle}</Styled.SubTitleNode>
        )}
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
