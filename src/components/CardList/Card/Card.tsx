import React, { useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import * as Styled from './styles'
import CircularProgress from '@mui/material/CircularProgress'

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
  getMetadata: () => Promise<string[]>
  loadingText: string
  userFacingErrorText: string
  errorLogText: string
}

type Props = {
  card: CardType
}

const Card = ({ card }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [metadata, setMetadata] = useState([card.metadata?.defaultMetadata])
  const [error, setError] = useState<string | undefined>(undefined)

  const fetchMetadata = useCallback(
    async (
      callback: () => Promise<string[]>,
      userFacingErrorText: string,
      errorLogText: string
    ) => {
      setError(undefined)
      const delayedLoading = setTimeout(() => setIsLoading(true), 500)
      try {
        const fetchedMetadata = await callback()
        setMetadata(fetchedMetadata)
      } catch (error) {
        console.error(errorLogText)
        setError(userFacingErrorText)
      }
      clearTimeout(delayedLoading)
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
      <Styled.Metadata>
        {metadata.map((metadata, index) => (
          <li key={index}>{metadata}</li>
        ))}
      </Styled.Metadata>
      {error !== undefined ? <Styled.Error>{error}</Styled.Error> : null}
      {card.metadata?.dynamicMetadata !== undefined && isLoading ? (
        <Styled.Spinner>
          <Styled.LoaderInfo>
            {card.metadata.dynamicMetadata.loadingText}
          </Styled.LoaderInfo>
          <CircularProgress size={15} />
        </Styled.Spinner>
      ) : null}
    </Styled.Card>
  )
}

export default Card
