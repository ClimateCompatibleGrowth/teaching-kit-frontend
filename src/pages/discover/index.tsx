import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import CardList from '../../components/CardList/CardList'
import Filter, { Filter as FilterType } from '../../components/Filter/Filter'
import { searchForAuthors } from '../../shared/requests/authors/authors'
import { filterCourseOnKeywordsAndAuthors } from '../../shared/requests/courses/courses'
import { searchForKeywords } from '../../shared/requests/keywords/keywords'
import { Pagination } from '../../shared/requests/types'
import { Course, Data } from '../../types'

// Note that Strapi's default value for page sizes currently is 25. Hence,
// if this constant is increased to > 25, we will still only get 25 results.
const MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN = 20

const FilterGroup = styled.div`
  display: flex;
  gap: 3rem;
`

const Styled = { FilterGroup }

export default function Discover() {
  const [selectedKeywords, setSelectedKeywords] = useState<FilterType[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<FilterType[]>([])
  const [filterResults, setFilterResults] = useState<Data<Course>[]>([])
  const [pagination, setPagination] = useState<Pagination>()

  useEffect(() => {
    onSelectedKeywordsChange(selectedKeywords, selectedAuthors)
  }, [selectedKeywords, selectedAuthors])

  const onSelectedKeywordsChange = async (
    keywords: FilterType[],
    authors: FilterType[]
  ) => {
    const filterResponse = await filterCourseOnKeywordsAndAuthors(
      keywords.map((keyword) => keyword.title),
      authors.map((author) => author.title)
    )

    setFilterResults(filterResponse.data)
    setPagination(filterResponse.meta.pagination)
  }

  const getMatchingFilters = async (searchTerm: string) => {
    const matchingKeywords = await searchForKeywords(searchTerm)
    return matchingKeywords.map((matchingKeyword) => ({
      id: matchingKeyword.id.toString(),
      title: matchingKeyword.attributes.Keyword,
    }))
  }

  const getMatchingAuthors = async (searchTerm: string) => {
    const matchingAuthors = await searchForAuthors(searchTerm)
    return matchingAuthors.map((matchingAuthor) => ({
      id: matchingAuthor.id.toString(),
      title: matchingAuthor.attributes.Name,
    }))
  }

  return (
    <div className="container">
      <h1>Learning Material</h1>
      <div>
        <h2>Apply filter</h2>
        <Styled.FilterGroup>
          <Filter
            selectedFilters={selectedKeywords}
            setSelectedFilters={setSelectedKeywords}
            typeToFilterOn="Keyword"
            maxAmountOfFiltersInDropdown={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
            searchForFilters={getMatchingFilters}
          />
          <Filter
            selectedFilters={selectedAuthors}
            setSelectedFilters={setSelectedAuthors}
            typeToFilterOn="Author"
            maxAmountOfFiltersInDropdown={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
            searchForFilters={getMatchingAuthors}
          />
        </Styled.FilterGroup>
      </div>
      <div>
        <CardList
          cards={filterResults.map((result) => ({
            title: result.attributes.Title,
            id: result.id.toString(),
            text: result.attributes.Abstract,
            metaData: `Level: ${result.attributes.Level}`,
          }))}
        />
      </div>
    </div>
  )
}
