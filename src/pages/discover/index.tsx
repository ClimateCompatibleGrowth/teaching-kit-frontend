import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import CardList from '../../components/CardList/CardList'
import Filter, { Filter as FilterType } from '../../components/Filter/Filter'
import PaginationController from '../../components/PaginationController/PaginationController'
import { searchForAuthors } from '../../shared/requests/authors/authors'
import { filterCourseOnKeywordsAndAuthors } from '../../shared/requests/courses/courses'
import { searchForKeywords } from '../../shared/requests/keywords/keywords'
import { Pagination } from '../../shared/requests/types'
import { PageContainer } from '../../styles/global'
import { Course, Data } from '../../types'

// Note that Strapi's default value for page sizes currently is 25. Hence,
// if this constant is increased to > 25, we will still only get 25 results.
const MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN = 20

const FilterGroup = styled.div`
  display: flex;
  gap: 3rem;
`

const H2 = styled.h2`
  font-size: 2.8rem;
`

const Styled = { FilterGroup, H2 }

const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_MATCHES_PER_PAGE = 10

const defaultPagination = {
  page: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_MATCHES_PER_PAGE,
  pageCount: 1,
  total: 0,
}

export default function Discover() {
  const [selectedKeywords, setSelectedKeywords] = useState<FilterType[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<FilterType[]>([])
  const [filterResults, setFilterResults] = useState<Data<Course>[]>([])
  const [pagination, setPagination] = useState<Pagination>(defaultPagination)
  const [currentPageNumber, setCurrentPageNumber] =
    useState(DEFAULT_PAGE_NUMBER)

  useEffect(() => {
    onSelectedKeywordsChange(
      selectedKeywords,
      selectedAuthors,
      currentPageNumber
    )
  }, [selectedKeywords, selectedAuthors, currentPageNumber])

  const onSelectedKeywordsChange = async (
    keywords: FilterType[],
    authors: FilterType[],
    currentPageNumber: number
  ) => {
    const filterResponse = await filterCourseOnKeywordsAndAuthors(
      keywords.map((keyword) => keyword.title),
      authors.map((author) => author.title),
      currentPageNumber,
      DEFAULT_MATCHES_PER_PAGE
    )

    setFilterResults(filterResponse.data)
    setPagination(filterResponse.meta.pagination)
  }

  const getMatchingKeywords = useCallback(async (searchTerm: string) => {
    const matchingKeywords = await searchForKeywords(searchTerm)
    return matchingKeywords.map((matchingKeyword) => ({
      id: matchingKeyword.id.toString(),
      title: matchingKeyword.attributes.Keyword,
    }))
  }, [])

  const getMatchingAuthors = useCallback(async (searchTerm: string) => {
    const matchingAuthors = await searchForAuthors(searchTerm)
    return matchingAuthors.map((matchingAuthor) => ({
      id: matchingAuthor.id.toString(),
      title: matchingAuthor.attributes.Name,
    }))
  }, [])

  return (
    <PageContainer>
      <h1>Learning Material</h1>
      <div>
        <Styled.H2>Apply filter</Styled.H2>
        <Styled.FilterGroup>
          <Filter
            selectedFilters={selectedKeywords}
            setSelectedFilters={setSelectedKeywords}
            typeToFilterOn='Keyword'
            maxAmountOfFiltersInDropdown={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
            searchForFilters={getMatchingKeywords}
          />
          <Filter
            selectedFilters={selectedAuthors}
            setSelectedFilters={setSelectedAuthors}
            typeToFilterOn='Author'
            maxAmountOfFiltersInDropdown={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
            searchForFilters={getMatchingAuthors}
          />
        </Styled.FilterGroup>
      </div>
      <Styled.H2>All Learning Material</Styled.H2>
      <div>
        <CardList
          cards={filterResults.map((result) => ({
            title: result.attributes.Title,
            id: result.id.toString(),
            text: result.attributes.Abstract,
            metadata: `Level: ${result.attributes.Level}`,
          }))}
        />
        {pagination.pageCount > 1 ? (
          <PaginationController
            amountOfPages={pagination.pageCount}
            currentPageNumber={currentPageNumber}
            setCurrentPage={(pageNumber) => setCurrentPageNumber(pageNumber)}
          />
        ) : null}
      </div>
    </PageContainer>
  )
}
