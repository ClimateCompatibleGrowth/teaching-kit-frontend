import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebouce'
import {
  Data,
  KeywordAttributes,
  searchForKeywords,
} from '../../shared/requests/filter'

type Props = {
  selectedKeywords: Data<KeywordAttributes>[]
  setSelectedKeywords: Dispatch<SetStateAction<Data<KeywordAttributes>[]>>
}

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
    if (searchTerm.length < 2) {
      return
    }

    const matchingKeywords = await searchForKeywords(searchTerm)
    setMatchingKeywords(matchingKeywords)
  }

  const selectKeyword = (selectedKeyword: Data<KeywordAttributes>) =>
    setSelectedKeywords((previousState) => [
      ...new Set([...previousState, selectedKeyword]),
    ])

  const deselectKeyword = (selectedKeyword: Data<KeywordAttributes>) =>
    setSelectedKeywords((previousState) =>
      previousState.filter((keyword) => keyword.id !== selectedKeyword.id)
    )

  return (
    <div className="container">
      <div>
        {selectedKeywords.map((selectedKeyword, index) => (
          <button key={index} onClick={() => deselectKeyword(selectedKeyword)}>
            {selectedKeyword.attributes.Keyword}
          </button>
        ))}
      </div>
      <input
        placeholder="Search for keywords"
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          setSearchTerm(event.currentTarget.value)
        }
      />
      <div>
        {matchingKeywords.map((matchingKeyword, index) => (
          <button key={index} onClick={() => selectKeyword(matchingKeyword)}>
            {matchingKeyword.attributes.Keyword}
          </button>
        ))}
      </div>
    </div>
  )
}
