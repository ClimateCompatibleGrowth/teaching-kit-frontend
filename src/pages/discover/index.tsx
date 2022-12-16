import { useEffect, useState } from 'react'
import CardList from '../../components/CardList/CardList'
import Filter, { Filter as FilterType } from '../../components/Filter/Filter'
import { filterCoursesOnKeywords } from '../../shared/requests/courses/courses'
import { searchForKeywords } from '../../shared/requests/keywords/keywords'
import { Pagination } from '../../shared/requests/types'
import { Course, Data, Keyword } from '../../types'

// Note that Strapi's default value for page sizes currently is 25. Hence,
// if this constant is increased to > 25, we will still only get 25 results.
const MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN = 20

export default function Discover() {
  const [selectedKeywords, setSelectedKeywords] = useState<FilterType[]>([])
  const [filterResults, setFilterResults] = useState<Data<Course>[]>([])
  const [pagination, setPagination] = useState<Pagination>()

  useEffect(() => {
    onSelectedKeywordsChange(selectedKeywords)
  }, [selectedKeywords])

  const onSelectedKeywordsChange = async (keywords: FilterType[]) => {
    const filterResponse = await filterCoursesOnKeywords(
      keywords.map((selectedKeyword) => selectedKeyword.title)
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

  return (
    <div className="container">
      <h1>Learning Material</h1>
      <div>
        <h2>Apply filter</h2>
        <Filter
          selectedFilters={selectedKeywords}
          setSelectedFilters={setSelectedKeywords}
          typeToFilterOn="Keyword"
          maxAmountOfFiltersInDropdown={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
          searchForFilters={getMatchingFilters}
        />
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
