import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import Filter, { Filter as FilterType } from '../../components/Filter/Filter'
import TabGroup from '../../components/TabGroup/TabGroup'
import { searchForAuthors } from '../../shared/requests/authors/authors'
import { searchForKeywords } from '../../shared/requests/keywords/keywords'
import { PageContainer } from '../../styles/global'

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

export default function Discover() {
  const [selectedKeywords, setSelectedKeywords] = useState<FilterType[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<FilterType[]>([])

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
        <TabGroup
          selectedKeywords={selectedKeywords.map(
            (selectedKeyword) => selectedKeyword.title
          )}
          selectedAuthors={selectedAuthors.map(
            (selectedAuthor) => selectedAuthor.title
          )}
        />
      </div>
    </PageContainer>
  )
}
