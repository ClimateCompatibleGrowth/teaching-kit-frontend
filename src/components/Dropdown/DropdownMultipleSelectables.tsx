import React, { createRef, RefObject, useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebouce'
import Chip from '../Chip/Chip'

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'

import * as Styled from './styles'
import useOutsideClickAlerter from '../../hooks/useOutsideClickAlerter'
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from '@mui/icons-material'
import DropdownListItem from './DropdownListItem/DropdownListItem'

export type Item = {
  id: string
  label: string
}

type Props = {
  selectedItems: Item[]
  setSelectedItems: (newItems: Item[]) => void
  label: string
  placeholder: string
  ariaLabel: string
  getItems: (searchTerm: string) => Promise<Item[]>
  enableSearch?: boolean
  maxAmountOfItems?: number
}

export default function DropdownMultipleSelectables({
  selectedItems,
  setSelectedItems,
  label,
  placeholder,
  ariaLabel,
  getItems,
  enableSearch = true,
  maxAmountOfItems = 20,
}: Props) {
  const wrapperRef: RefObject<HTMLDivElement> = createRef()
  const [items, setItems] = useState(selectedItems)
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
    setSelectedItems(items)
  }, [items, setSelectedItems])

  const selectItem = (selectedItem: Item) =>
    setItems((previousState) => [...new Set([...previousState, selectedItem])])

  const deselectItem = (selectedItemId: string) =>
    setItems((previousState) =>
      previousState.filter((item) => item.id !== selectedItemId)
    )

  const itemIsSelected = (item: Item) =>
    selectedItems.map((selectedItem) => selectedItem.id).includes(item.id)

  const getListItemCheckIcon = (item: Item) => {
    return itemIsSelected(item) ? (
      <CheckBoxOutlined />
    ) : (
      <CheckBoxOutlineBlankOutlined />
    )
  }

  const onClickListItem = (item: Item) => {
    itemIsSelected(item) ? deselectItem(item.id.toString()) : selectItem(item)
  }

  const renderAllResults = () =>
    matchingItems.map((matchingItem, index) => (
      <DropdownListItem
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
          <DropdownListItem
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
    <Styled.Wrapper>
      <Styled.DropdownWrapper ref={wrapperRef}>
        <Styled.Label htmlFor={`${label}dropdown`}>{label}</Styled.Label>
        <Styled.InputWrapper>
          <Styled.IconButton
            onClick={() => setDoShowResultsList((prevState) => !prevState)}
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
      <Styled.SelectedItemsWrapper>
        {selectedItems.map((selectedItem, index) => (
          <Styled.SelectedItem key={index}>
            <Chip
              label={selectedItem.label}
              id={selectedItem.id.toString()}
              onDelete={deselectItem}
            />
          </Styled.SelectedItem>
        ))}
      </Styled.SelectedItemsWrapper>
    </Styled.Wrapper>
  )
}
