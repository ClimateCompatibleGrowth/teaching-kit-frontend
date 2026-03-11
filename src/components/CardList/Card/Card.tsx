import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { Locale, MediaFiles, MediaFile } from '../../../types'
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
  logo?: MediaFile
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
      <Styled.Card youAreHere={youAreHere} onClick={handleDirectClick}>
        {card.locale !== undefined && card.locale !== routerLocale ? (
          <TranslationDoesNotExist copy={card.translationDoesNotExistCopy} />
        ) : null}

        {/* Flex container for title, text and logo */}
        <Styled.ContentAndLogoContainer>
          <Styled.TextContent>
            <Styled.Title>{card.title}</Styled.Title>
            <Styled.Markdown>
              <Markdown allowedElements={['p']}>{card.text}</Markdown>
            </Styled.Markdown>
          </Styled.TextContent>
          {card.logo?.data?.attributes?.url && (
            <Styled.Logo
              src={card.logo.data.attributes.url}
              alt={card.logo.data.attributes.alternativeText || card.title}
            />
          )}
        </Styled.ContentAndLogoContainer>
        {/* Here is the blue lecture download buttons */}
        {card.files?.data && (
          <Styled.FilesTitle>Lecture files</Styled.FilesTitle>
        )}
        {card.files?.data && (
          <Styled.FilesContainer>
            {card.files.data.map((file) => {
              const fileName =
                file.attributes.alternativeText || file.attributes.name
              return (
              <Styled.LectureFile
                key={file.id}
                primary
                href={file.attributes.url}
                download
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'file_download_custom', {
                      file_name: fileName,
                      link_url: file.attributes.url,
                      card_title: card.title,
                      transport_type: 'beacon',
                    })
                  }
                }}
              >
  {fileName}
</Styled.LectureFile>
              )
            })}
          </Styled.FilesContainer>
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
