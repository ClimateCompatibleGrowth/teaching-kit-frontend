import React, { useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import * as Styled from './styles'

export type CardType = {
  id: string
  title: string
  text: string
  metadata?: Metadata
  subTitle?: string
}

type Metadata = {
  defaultMetadata: string
  dynamicMetadata?: DynamicMetadata
}

type DynamicMetadata = {
  getMetadata: () => Promise<string>
  userFacingErrorText: string
  errorLogText: string
}

type Props = {
  card: CardType
}

const Card = ({ card }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [metadata, setMetadata] = useState(card.metadata?.defaultMetadata)
  const [error, setError] = useState<string | undefined>(undefined)

  const fetchMetadata = useCallback(
    async (
      callback: () => Promise<string>,
      userFacingErrorText: string,
      errorLogText: string
    ) => {
      setIsLoading(true)
      try {
        const metadata = await callback()
        setMetadata(metadata)
      } catch (error) {
        console.error(errorLogText)
        setError(userFacingErrorText)
      }
      setIsLoading(false)
    },
    []
  )

  useEffect(() => {
    if (card.metadata?.dynamicMetadata !== undefined) {
      const { getMetadata, userFacingErrorText, errorLogText } =
        card.metadata.dynamicMetadata
      fetchMetadata(getMetadata, userFacingErrorText, errorLogText)
    }
  }, [fetchMetadata, card.metadata?.dynamicMetadata])

  return (
    <Styled.Card>
      {card.subTitle !== undefined ? (
        <Styled.SubTitle>{card.subTitle}</Styled.SubTitle>
      ) : null}
      <Styled.Title>{card.title}</Styled.Title>
      <Styled.Markdown>
        <ReactMarkdown>{card.text}</ReactMarkdown>
      </Styled.Markdown>
      {isLoading ? (
        <Styled.Metadata>{metadata} - Loading</Styled.Metadata>
      ) : (
        <Styled.Metadata>
          {metadata} {error !== undefined ? `- ${error}` : ''}
        </Styled.Metadata>
      )}
    </Styled.Card>
  )
}

export default Card
