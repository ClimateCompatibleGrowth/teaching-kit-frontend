import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebouce'
import {
  Data,
  KeywordAttributes,
  searchForKeywords,
} from '../../shared/requests/filter'
import Chip from '../Chip/Chip'
import FilterDropdownListItem from './FilterDropdownListItem/FilterDropdownListItem'

import {
  FilterDropdownList,
  FilterInput,
  FilterWrapper,
  MoreResultsInformation,
  SelectedKeyword,
  SelectedKeywordWrapper,
} from './styles'

type Props = {
  selectedKeywords: Data<KeywordAttributes>[]
  setSelectedKeywords: Dispatch<SetStateAction<Data<KeywordAttributes>[]>>
}

// Note that Strapi's default value for page sizes currently is 25. Hence,
// if this constant is increased to > 25, we will still only get 25 results.
const MAX_AMOUNT_OF_KEYWORDS_IN_DROPDOWN = 20

export default function Filter({
  selectedKeywords,
  setSelectedKeywords,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 200)
  const [matchingKeywords, setMatchingKeywords] = useState<
    Data<KeywordAttributes>[]
  >([])

  useEffect(() => {
    onSearchTermChange(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const onSearchTermChange = async (searchTerm: string) => {
    const matchingKeywords = await searchForKeywords(searchTerm)
    setMatchingKeywords(matchingKeywords)
  }

  const selectKeyword = (selectedKeyword: Data<KeywordAttributes>) =>
    setSelectedKeywords((previousState) => [
      ...new Set([...previousState, selectedKeyword]),
    ])

  const deselectKeyword = (selectedKeywordId: string) =>
    setSelectedKeywords((previousState) =>
      previousState.filter(
        (keyword) => keyword.id !== parseInt(selectedKeywordId)
      )
    )

  const renderAllResults = () =>
    matchingKeywords.map((matchingKeyword, index) => (
      <FilterDropdownListItem
        key={index}
        label={matchingKeyword.attributes.Keyword}
        onClick={() => selectKeyword(matchingKeyword)}
      />
    ))

  const renderLimitedResults = (resultsLengthLimit: number) => {
    return (
      <>
        {[...Array(resultsLengthLimit).keys()].map((index) => (
          <FilterDropdownListItem
            key={index}
            label={matchingKeywords[index].attributes.Keyword}
            onClick={() => selectKeyword(matchingKeywords[index])}
          />
        ))}
        <MoreResultsInformation>{`... and ${
          matchingKeywords.length - resultsLengthLimit
        } more matches`}</MoreResultsInformation>
      </>
    )
  }

  return (
    <FilterWrapper>
      <SelectedKeywordWrapper>
        {selectedKeywords.map((selectedKeyword, index) => (
          <SelectedKeyword key={index}>
            <Chip
              label={selectedKeyword.attributes.Keyword}
              id={selectedKeyword.id.toString()}
              onDelete={deselectKeyword}
            />
          </SelectedKeyword>
        ))}
      </SelectedKeywordWrapper>
      <FilterInput
        placeholder="Search for keywords"
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          setSearchTerm(event.currentTarget.value)
        }
      />
      <FilterDropdownList>
        {matchingKeywords.length > MAX_AMOUNT_OF_KEYWORDS_IN_DROPDOWN
          ? renderLimitedResults(MAX_AMOUNT_OF_KEYWORDS_IN_DROPDOWN)
          : renderAllResults()}
      </FilterDropdownList>
    </FilterWrapper>
  )
}
