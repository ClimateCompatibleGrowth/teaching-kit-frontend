import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import DropdownMultipleSelectables, {
  Item,
} from '../../components/Dropdown/DropdownMultipleSelectables'
import TabGroup from '../../components/TabGroup/TabGroup'
import { searchForAuthors } from '../../shared/requests/authors/authors'
import { searchForKeywords } from '../../shared/requests/keywords/keywords'
import { mq, PageContainer } from '../../styles/global'

// Note that Strapi's default value for page sizes currently is 25. Hence,
// if this constant is increased to > 25, we will still only get 25 results.
const MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN = 20

const FilterGroup = styled.div`
  ${mq.sm} {
    display: flex;
    gap: 3rem;
    flex-wrap: no-wrap;
  }
`

const H2 = styled.h2`
  font-size: 2.8rem;
`

const Styled = { FilterGroup, H2 }

export default function Discover() {
  const [selectedKeywords, setSelectedKeywords] = useState<Item[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<Item[]>([])

  const getMatchingKeywords = useCallback(
    async (searchTerm: string): Promise<Item[]> => {
      const matchingKeywords = await searchForKeywords(searchTerm)
      return matchingKeywords.map((matchingKeyword) => ({
        id: matchingKeyword.id.toString(),
        label: matchingKeyword.attributes.Keyword,
      }))
    },
    []
  )

  const getMatchingAuthors = useCallback(
    async (searchTerm: string): Promise<Item[]> => {
      const matchingAuthors = await searchForAuthors(searchTerm)
      return matchingAuthors.map((matchingAuthor) => ({
        id: matchingAuthor.id.toString(),
        label: matchingAuthor.attributes.Name,
      }))
    },
    []
  )

  return (
    <PageContainer hasTopPadding>
      <h1>Learning Material</h1>
      <div>
        <Styled.H2>Apply filter</Styled.H2>
        <Styled.FilterGroup>
          <DropdownMultipleSelectables
            selectedItems={selectedKeywords}
            setSelectedItems={setSelectedKeywords}
            label='Keyword'
            placeholder='Select Keywords'
            ariaLabel='Keywords to pick from'
            maxAmountOfItems={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
            getItems={getMatchingKeywords}
          />
          <DropdownMultipleSelectables
            selectedItems={selectedAuthors}
            setSelectedItems={setSelectedAuthors}
            label='Author'
            placeholder='Select Authors'
            ariaLabel='Authors to pick from'
            maxAmountOfItems={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
            getItems={getMatchingAuthors}
          />
        </Styled.FilterGroup>
      </div>
      <Styled.H2>All Learning Material</Styled.H2>
      <div>
        <TabGroup
          selectedKeywords={selectedKeywords.map(
            (selectedKeyword) => selectedKeyword.label
          )}
          selectedAuthors={selectedAuthors.map(
            (selectedAuthor) => selectedAuthor.label
          )}
        />
      </div>
    </PageContainer>
  )
}
