import React, {
  createRef,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react'
import useDebounce from '../../hooks/useDebouce'
import Chip from '../Chip/Chip'

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'

import * as Styled from './styles'
import useOutsideClickAlerter from '../../hooks/useOutsideClickAlerter'
import DropdownList from './DropdownList/DropdownList'
import { VisuallyHidden } from '../../styles/global'
import { Item } from '../../types/filters'

type Props = {
  controls: string
  id: string
  isSingleSelectable?: boolean
  selectedItems: Item[]
  setSelectedItems: (newItems: Item[]) => void
  label: string
  placeholder: string
  ariaLabel: string
  getItems: (searchTerm: string) => Promise<Item[]>
  enableSearch?: boolean
  maxAmountOfItems?: number
}

export default function Dropdown({
  controls,
  isSingleSelectable = false,
  selectedItems,
  setSelectedItems,
  label,
  placeholder,
  id,
  getItems,
  enableSearch = true,
  maxAmountOfItems = 20,
}: Props) {
  const wrapperRef = createRef<HTMLDivElement>()
  const dropdownRef = createRef<HTMLOListElement>()
  const [items, setItems] = useState(selectedItems)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 200)
  const [matchingItems, setMatchingItems] = useState<Item[]>([])
  const [doShowResultsList, setDoShowResultsList] = useState(false)
  const [suggestionIndex, setSuggestionIndex] = useState(-1)
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

  const setSingleItem = (item: Item) => {
    for (const i of matchingItems) {
      if (i.id !== item.id) {
        deselectItem(i)
      }
    }
    selectItem(item)
  }

  const toggleItem = (item: Item) => {
    const isSelected = selectedItems.some(
      (selectedItem: Item) => selectedItem.id === item.id
    )

    if (isSingleSelectable) {
      setSingleItem(item)
    } else if (isSelected) {
      deselectItem(item)
    } else {
      selectItem(item)
    }
  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSuggestionIndex(-1)
    setSearchTerm(event.currentTarget.value)
  }

  const selectItem = (selectedItem: Item) => {
    setItems((previousState) => [...new Set([...previousState, selectedItem])])
  }

  const deselectItem = (selectedItem: Item) =>
    setItems((previousState) =>
      previousState.filter((item) => item.id !== selectedItem.id)
    )

  const resultsToShow = Math.min(matchingItems.length, maxAmountOfItems)

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc' || e.key === 'Tab') {
      setDoShowResultsList(false)
      setSuggestionIndex(-1)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const item = matchingItems[suggestionIndex]
      if (item) {
        toggleItem(item)
      }
    }
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      e.preventDefault()
      setDoShowResultsList(true)
      if (suggestionIndex === -1) {
        setSuggestionIndex(0)
        return
      }

      const isGreaterThanResultsListLength = suggestionIndex < resultsToShow - 1
      setSuggestionIndex(
        isGreaterThanResultsListLength ? suggestionIndex + 1 : 0
      )
    }
    if (e.key === 'ArrowUp' || e.key === 'Up') {
      e.preventDefault()
      setDoShowResultsList(true)
      if (suggestionIndex === -1) {
        setSuggestionIndex(0)
        return
      }
      const isLessThanResultsListLength = suggestionIndex <= 0
      setSuggestionIndex(
        isLessThanResultsListLength ? resultsToShow - 1 : suggestionIndex - 1
      )
    }
  }

  return (
    <Styled.Wrapper>
      <Styled.DropdownWrapper ref={wrapperRef}>
        <Styled.Label>{label}</Styled.Label>
        <Styled.InputWrapper>
          <Styled.DropdownInput
            aria-label={`Change ${label} ${
              isSingleSelectable ? 'option' : 'options'
            }`}
            placeholder={placeholder}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            value={enableSearch ? undefined : placeholder}
            onClick={() => {
              setDoShowResultsList(!doShowResultsList)
            }}
            aria-controls={`${id} ${controls}`}
            aria-describedby={`${id}-help`}
            searchIsEnabled={enableSearch}
            role='combobox'
            aria-autocomplete='list'
            aria-haspopup='listbox'
            aria-expanded={doShowResultsList}
            aria-activedescendant={
              suggestionIndex === -1
                ? undefined
                : `${id}-option-${suggestionIndex}`
            }
          />
          <Styled.IconButton
            onClick={() => {
              setDoShowResultsList(!doShowResultsList)
            }}
            aria-hidden
            isPointingDown={doShowResultsList}
          >
            <ExpandMoreOutlinedIcon style={{ height: '2rem', width: '2rem' }} />
          </Styled.IconButton>
        </Styled.InputWrapper>
        <VisuallyHidden id={`${id}-help`}>
          Options are shown below
        </VisuallyHidden>
        {doShowResultsList && (
          <DropdownList
            id={id}
            ref={dropdownRef}
            isSingleSelectable={isSingleSelectable}
            selectedIndex={suggestionIndex}
            selectedItems={selectedItems}
            items={matchingItems}
            toggleItem={isSingleSelectable ? setSingleItem : toggleItem}
          />
        )}
      </Styled.DropdownWrapper>
      {!isSingleSelectable && (
        <Styled.SelectedItemsWrapper>
          {selectedItems.map((selectedItem, index) => (
            <Styled.SelectedItem key={index}>
              <Chip
                label={selectedItem.label}
                id={selectedItem.id.toString()}
                onDelete={() => deselectItem(selectedItem)}
              />
            </Styled.SelectedItem>
          ))}
        </Styled.SelectedItemsWrapper>
      )}
    </Styled.Wrapper>
  )
}
