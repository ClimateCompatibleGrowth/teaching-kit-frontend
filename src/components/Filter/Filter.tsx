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
import { Data, Keyword } from '../../types'
import { searchForKeywords } from '../../shared/requests/keywords/keywords'
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from '@mui/icons-material'

type Props = {
  selectedKeywords: Data<Keyword>[]
  setSelectedKeywords: Dispatch<SetStateAction<Data<Keyword>[]>>
}

// Note that Strapi's default value for page sizes currently is 25. Hence,
// if this constant is increased to > 25, we will still only get 25 results.
const MAX_AMOUNT_OF_KEYWORDS_IN_DROPDOWN = 20

export default function Filter({
  selectedKeywords,
  setSelectedKeywords,
}: Props) {
  const wrapperRef: RefObject<HTMLDivElement> = createRef()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 200)
  const [matchingKeywords, setMatchingKeywords] = useState<Data<Keyword>[]>([])
  const [doShowResultsList, setDoShowResultsList] = useState(false)
  useOutsideClickAlerter(wrapperRef, () => setDoShowResultsList(false))

  useEffect(() => {
    onSearchTermChange(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const onSearchTermChange = async (searchTerm: string) => {
    const matchingKeywords = await searchForKeywords(searchTerm)
    setMatchingKeywords(matchingKeywords)
    if (searchTerm.length > 1) {
      setDoShowResultsList(true)
    }
  }

  const selectKeyword = (selectedKeyword: Data<Keyword>) =>
    setSelectedKeywords((previousState) => [
      ...new Set([...previousState, selectedKeyword]),
    ])

  const deselectKeyword = (selectedKeywordId: string) =>
    setSelectedKeywords((previousState) =>
      previousState.filter(
        (keyword) => keyword.id !== parseInt(selectedKeywordId)
      )
    )

  const itemIsSelected = (keyword: Data<Keyword>) =>
    selectedKeywords
      .map((selectedKeyword) => selectedKeyword.id)
      .includes(keyword.id)

  const getListItemCheckIcon = (keyword: Data<Keyword>) => {
    return itemIsSelected(keyword) ? (
      <CheckBoxOutlined />
    ) : (
      <CheckBoxOutlineBlankOutlined />
    )
  }

  const onClickListItem = (keyword: Data<Keyword>) => {
    itemIsSelected(keyword)
      ? deselectKeyword(keyword.id.toString())
      : selectKeyword(keyword)
  }

  const renderAllResults = () =>
    matchingKeywords.map((matchingKeyword, index) => (
      <FilterDropdownListItem
        key={index}
        label={matchingKeyword.attributes.Keyword}
        onClick={() => onClickListItem(matchingKeyword)}
        icon={getListItemCheckIcon(matchingKeyword)}
        ariaPressed={itemIsSelected(matchingKeyword)}
      />
    ))

  const renderLimitedResults = (resultsLengthLimit: number) => {
    return (
      <>
        {[...Array(resultsLengthLimit).keys()].map((index) => (
          <FilterDropdownListItem
            key={index}
            label={matchingKeywords[index].attributes.Keyword}
            onClick={() => onClickListItem(matchingKeywords[index])}
            icon={getListItemCheckIcon(matchingKeywords[index])}
            ariaPressed={itemIsSelected(matchingKeywords[index])}
          />
        ))}
        <Styled.MoreResultsInformation>{`... and ${
          matchingKeywords.length - resultsLengthLimit
        } more matches`}</Styled.MoreResultsInformation>
      </>
    )
  }

  return (
    <>
      <Styled.FilterWrapper ref={wrapperRef}>
        <Styled.Label htmlFor="keywordFilter">Keyword</Styled.Label>
        <Styled.InputWrapper>
          <Styled.IconButton
            onClick={() => setDoShowResultsList((prevState) => !prevState)}
            isPointingDown={doShowResultsList}
            aria-label={`${
              doShowResultsList ? 'Hide' : 'Show'
            } keywords to filter on`}
            aria-pressed={doShowResultsList}
          >
            <ExpandMoreOutlinedIcon style={{ height: '2rem', width: '2rem' }} />
          </Styled.IconButton>
          <Styled.FilterInput
            name="keywordFilter"
            placeholder="Select keywords"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setSearchTerm(event.currentTarget.value)
            }
          />
        </Styled.InputWrapper>
        {doShowResultsList && (
          <Styled.FilterDropdownList>
            {matchingKeywords.length > MAX_AMOUNT_OF_KEYWORDS_IN_DROPDOWN
              ? renderLimitedResults(MAX_AMOUNT_OF_KEYWORDS_IN_DROPDOWN)
              : renderAllResults()}
          </Styled.FilterDropdownList>
        )}
      </Styled.FilterWrapper>
      <Styled.SelectedKeywordWrapper>
        {selectedKeywords.map((selectedKeyword, index) => (
          <Styled.SelectedKeyword key={index}>
            <Chip
              label={selectedKeyword.attributes.Keyword}
              id={selectedKeyword.id.toString()}
              onDelete={deselectKeyword}
            />
          </Styled.SelectedKeyword>
        ))}
      </Styled.SelectedKeywordWrapper>
    </>
  )
}
