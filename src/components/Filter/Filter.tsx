import React, {
  createRef,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import useDebounce from '../../hooks/useDebouce'
import Chip from '../Chip/Chip'
import FilterDropdownListItem from './FilterDropdownListItem/FilterDropdownListItem'

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'

import * as Styled from './styles'
import useOutsideClickAlerter from '../../hooks/useOutsideClickAlerter'
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from '@mui/icons-material'

export type Filter = {
  id: string
  title: string
}

type Props = {
  selectedFilters: Filter[]
  setSelectedFilters: Dispatch<SetStateAction<Filter[]>>
  typeToFilterOn: string
  maxAmountOfFiltersInDropdown: number
  searchForFilters: (searchTerm: string) => Promise<Filter[]>
}

export default function Filter({
  selectedFilters,
  setSelectedFilters,
  typeToFilterOn,
  maxAmountOfFiltersInDropdown = 20,
  searchForFilters,
}: Props) {
  const wrapperRef: RefObject<HTMLDivElement> = createRef()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 200)
  const [matchingFilters, setMatchingFilters] = useState<Filter[]>([])
  const [doShowResultsList, setDoShowResultsList] = useState(false)
  useOutsideClickAlerter(wrapperRef, () => setDoShowResultsList(false))

  useEffect(() => {
    const onSearchTermChange = async (searchTerm: string) => {
      const matchingFilters = await searchForFilters(searchTerm)
      setMatchingFilters(matchingFilters)
      if (searchTerm.length > 1) {
        setDoShowResultsList(true)
      }
    }

    onSearchTermChange(debouncedSearchTerm)
  }, [debouncedSearchTerm, searchForFilters])

  const selectFilter = (selectedFilter: Filter) =>
    setSelectedFilters((previousState) => [
      ...new Set([...previousState, selectedFilter]),
    ])

  const deselectFilter = (selectedFilterId: string) =>
    setSelectedFilters((previousState) =>
      previousState.filter((filter) => filter.id !== selectedFilterId)
    )

  const filterIsSelected = (filter: Filter) =>
    selectedFilters
      .map((selectedFilter) => selectedFilter.id)
      .includes(filter.id)

  const getListItemCheckIcon = (filter: Filter) => {
    return filterIsSelected(filter) ? (
      <CheckBoxOutlined />
    ) : (
      <CheckBoxOutlineBlankOutlined />
    )
  }

  const onClickListItem = (filter: Filter) => {
    filterIsSelected(filter)
      ? deselectFilter(filter.id.toString())
      : selectFilter(filter)
  }

  const renderAllResults = () =>
    matchingFilters.map((matchingFilter, index) => (
      <FilterDropdownListItem
        key={index}
        label={matchingFilter.title}
        onClick={() => onClickListItem(matchingFilter)}
        icon={getListItemCheckIcon(matchingFilter)}
        ariaPressed={filterIsSelected(matchingFilter)}
      />
    ))

  const renderLimitedResults = (resultsLengthLimit: number) => {
    return (
      <>
        {[...Array(resultsLengthLimit).keys()].map((index) => (
          <FilterDropdownListItem
            key={index}
            label={matchingFilters[index].title}
            onClick={() => onClickListItem(matchingFilters[index])}
            icon={getListItemCheckIcon(matchingFilters[index])}
            ariaPressed={filterIsSelected(matchingFilters[index])}
          />
        ))}
        <Styled.MoreResultsInformation>{`... and ${
          matchingFilters.length - resultsLengthLimit
        } more matches`}</Styled.MoreResultsInformation>
      </>
    )
  }

  return (
    <div>
      <Styled.FilterWrapper ref={wrapperRef}>
        <Styled.Label htmlFor={`${typeToFilterOn}filter`}>
          {typeToFilterOn}
        </Styled.Label>
        <Styled.InputWrapper>
          <Styled.IconButton
            onClick={() => setDoShowResultsList((prevState) => !prevState)}
            isPointingDown={doShowResultsList}
            aria-label={`${
              doShowResultsList ? 'Hide' : 'Show'
            } ${typeToFilterOn}s to filter on`}
            aria-pressed={doShowResultsList}
          >
            <ExpandMoreOutlinedIcon style={{ height: '2rem', width: '2rem' }} />
          </Styled.IconButton>
          <Styled.FilterInput
            name={`${typeToFilterOn}filter`}
            placeholder={`Select ${typeToFilterOn}s`}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setSearchTerm(event.currentTarget.value)
            }
          />
        </Styled.InputWrapper>
        {doShowResultsList && (
          <Styled.FilterDropdownList>
            {matchingFilters.length > maxAmountOfFiltersInDropdown
              ? renderLimitedResults(maxAmountOfFiltersInDropdown)
              : renderAllResults()}
          </Styled.FilterDropdownList>
        )}
      </Styled.FilterWrapper>
      <Styled.SelectedFilterWrapper>
        {selectedFilters.map((selectedFilter, index) => (
          <Styled.SelectedFilter key={index}>
            <Chip
              label={selectedFilter.title}
              id={selectedFilter.id.toString()}
              onDelete={deselectFilter}
            />
          </Styled.SelectedFilter>
        ))}
      </Styled.SelectedFilterWrapper>
    </div>
  )
}
