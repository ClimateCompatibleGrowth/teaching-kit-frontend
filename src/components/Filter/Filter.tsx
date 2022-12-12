import {
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

import {
  FilterDropdownList,
  FilterInput,
  FilterWrapper,
  IconButton,
  MoreResultsInformation,
  InputWrapper,
  SelectedKeyword,
  SelectedKeywordWrapper,
} from './styles'
import useOutsideClickAlerter from '../../hooks/useOutsideClickAlerter'
import { Data, Keyword } from '../../types'
import { searchForKeywords } from '../../shared/requests/keywords/keywords'

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
    <FilterWrapper ref={wrapperRef}>
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
      <InputWrapper>
        <IconButton
          onClick={() => setDoShowResultsList((prevState) => !prevState)}
          isPointingDown={doShowResultsList}
        >
          <ExpandMoreOutlinedIcon />
        </IconButton>
        <FilterInput
          placeholder="Search for keywords"
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setSearchTerm(event.currentTarget.value)
          }
        />
      </InputWrapper>
      {doShowResultsList && (
        <FilterDropdownList>
          {matchingKeywords.length > MAX_AMOUNT_OF_KEYWORDS_IN_DROPDOWN
            ? renderLimitedResults(MAX_AMOUNT_OF_KEYWORDS_IN_DROPDOWN)
            : renderAllResults()}
        </FilterDropdownList>
      )}
    </FilterWrapper>
  )
}
