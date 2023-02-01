import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import * as Styled from './styles'

export type CardType = {
  id: string
  title: string
  text: string
  href?: string
  subTitle?: ReactNode
  metadata?: string
  subComponent?: ReactNode
}

type Props = {
  card: CardType
}

const Card = ({ card }: Props) => {
  return (
    <LinkWrapper card={card}>
      <Styled.Card isInteractive={card.href !== undefined}>
        {typeof card.subTitle === 'string' ? (
          <Styled.SubTitle>{card.subTitle}</Styled.SubTitle>
        ) : null}
        {typeof card.subTitle === 'object' && (
          <Styled.SubTitleNode>{card.subTitle}</Styled.SubTitleNode>
        )}
        <Styled.Title>{card.title}</Styled.Title>
        <Styled.Markdown>
          <ReactMarkdown>{card.text}</ReactMarkdown>
        </Styled.Markdown>
        {card.metadata !== undefined ? (
          <Styled.Metadata>{card.metadata}</Styled.Metadata>
        ) : null}
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
