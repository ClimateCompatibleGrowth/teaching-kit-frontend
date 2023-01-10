import { CircularProgress } from '@mui/material'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import * as Styled from './styles'

type Props = {
  getListItems: () => Promise<ListItem[]>
  renderListItem: (listItem: ListItem) => ReactNode
  loadingText: string
  userFacingErrorText: string
  errorLogText: string
}

export type ListItem = {
  [key: string]: any
}

const AsyncUnorderedList = ({
  getListItems,
  renderListItem,
  loadingText,
  userFacingErrorText,
  errorLogText,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [listItems, setListItems] = useState<ListItem[]>([])
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchMetadata = async (
      callback: () => Promise<ListItem[]>,
      userFacingErrorText: string,
      errorLogText: string
    ) => {
      setError(undefined)
      const delayedLoading = setTimeout(() => setIsLoading(true), 500)
      try {
        const fetchedMetadata = await callback()
        setListItems(fetchedMetadata)
      } catch (error) {
        console.error(errorLogText)
        setError(userFacingErrorText)
      }
      clearTimeout(delayedLoading)
      setIsLoading(false)
    }

    fetchMetadata(getListItems, userFacingErrorText, errorLogText)
  }, [getListItems, userFacingErrorText, errorLogText])

  return (
    <div>
      <Styled.Metadata>
        {listItems.map((listItem, index) => (
          <li key={index}>{renderListItem(listItem)}</li>
        ))}
      </Styled.Metadata>
      {error !== undefined ? <Styled.Error>{error}</Styled.Error> : null}
      {isLoading ? (
        <Styled.Spinner>
          <Styled.LoaderInfo>{loadingText}</Styled.LoaderInfo>
          <CircularProgress size={15} />
        </Styled.Spinner>
      ) : null}
    </div>
  )
}

export default AsyncUnorderedList
