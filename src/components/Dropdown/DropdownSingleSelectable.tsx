import React, { createRef, RefObject, useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebouce'

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'

import * as Styled from './styles'
import useOutsideClickAlerter from '../../hooks/useOutsideClickAlerter'
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from '@mui/icons-material'
import FilterDropdownListItem from './DropdownListItem/DropdownListItem'

export type Item = {
  id: string
  label: string
}

type Props = {
  selectedItem: Item
  setSelectedItem: (item: Item) => void
  label: string
  placeholder: string
  ariaLabel: string
  getItems: (searchTerm: string) => Promise<Item[]>
  enableSearch: boolean
  maxAmountOfItems?: number
}

export default function DropdownSingleSelectable({
  selectedItem,
  setSelectedItem,
  label,
  placeholder,
  ariaLabel,
  getItems,
  enableSearch,
  maxAmountOfItems = 20,
}: Props) {
  const wrapperRef: RefObject<HTMLDivElement> = createRef()
  const [item, setItem] = useState(selectedItem)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 200)
  const [matchingItems, setMatchingItems] = useState<Item[]>([])
  const [doShowResultsList, setDoShowResultsList] = useState(false)
  useOutsideClickAlerter(wrapperRef, () => setDoShowResultsList(false))

  useEffect(() => {
    const onSearchTermChange = async (searchTerm: string) => {
      const matchingItems = await getItems(searchTerm)
      setMatchingItems(matchingItems)
      if (searchTerm.length > 1) {
        setDoShowResultsList(true)
      }
    }

    onSearchTermChange(debouncedSearchTerm)
  }, [debouncedSearchTerm, getItems])

  useEffect(() => {
    setSelectedItem(item)
  }, [item, setSelectedItem])

  const selectFilter = (selectedItem: Item) => setItem(selectedItem)

  const itemIsSelected = (item: Item) => selectedItem.id === item.id

  const getListItemCheckIcon = (item: Item) => {
    return itemIsSelected(item) ? (
      <CheckBoxOutlined />
    ) : (
      <CheckBoxOutlineBlankOutlined />
    )
  }

  const onClickListItem = (item: Item) => selectFilter(item)

  const renderAllResults = () =>
    matchingItems.map((matchingItem, index) => (
      <FilterDropdownListItem
        key={index}
        label={matchingItem.label}
        onClick={() => onClickListItem(matchingItem)}
        icon={getListItemCheckIcon(matchingItem)}
        ariaPressed={itemIsSelected(matchingItem)}
      />
    ))

  const renderLimitedResults = (resultsLengthLimit: number) => {
    return (
      <>
        {[...Array(resultsLengthLimit).keys()].map((index) => (
          <FilterDropdownListItem
            key={index}
            label={matchingItems[index].label}
            onClick={() => onClickListItem(matchingItems[index])}
            icon={getListItemCheckIcon(matchingItems[index])}
            ariaPressed={itemIsSelected(matchingItems[index])}
          />
        ))}
        <Styled.MoreResultsInformation>{`... and ${
          matchingItems.length - resultsLengthLimit
        } more matches`}</Styled.MoreResultsInformation>
      </>
    )
  }

  return (
    <Styled.DropdownWrapper ref={wrapperRef}>
      <Styled.Label htmlFor={`${label}dropdown`}>{label}</Styled.Label>
      <Styled.InputWrapper
        onClick={
          !enableSearch
            ? () => setDoShowResultsList((prevState) => !prevState)
            : () => null
        }
      >
        <Styled.IconButton
          onClick={
            enableSearch
              ? () => setDoShowResultsList((prevState) => !prevState)
              : () => null
          }
          isPointingDown={doShowResultsList}
          aria-label={`${doShowResultsList ? 'Hide' : 'Show'} ${ariaLabel}`}
          aria-pressed={doShowResultsList}
        >
          <ExpandMoreOutlinedIcon style={{ height: '2rem', width: '2rem' }} />
        </Styled.IconButton>
        <Styled.DropdownInput
          name={`${label}dropdown`}
          placeholder={placeholder}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setSearchTerm(event.currentTarget.value)
          }
          disabled={!enableSearch}
          searchIsEnabled={enableSearch}
        />
      </Styled.InputWrapper>
      {doShowResultsList && (
        <Styled.DropdownList>
          {matchingItems.length > maxAmountOfItems
            ? renderLimitedResults(maxAmountOfItems)
            : renderAllResults()}
        </Styled.DropdownList>
      )}
    </Styled.DropdownWrapper>
  )
}
