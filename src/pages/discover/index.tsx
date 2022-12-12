import { useEffect, useState } from 'react'
import CardList from '../../components/CardList/CardList'
import Filter from '../../components/Filter/Filter'
import { filterCoursesOnKeywords } from '../../shared/requests/courses/courses'
import { Pagination } from '../../shared/requests/types'
import { Course, Data, Keyword } from '../../types'

export default function Discover() {
  const [selectedKeywords, setSelectedKeywords] = useState<Data<Keyword>[]>([])
  const [filterResults, setFilterResults] = useState<Data<Course>[]>([])
  const [pagination, setPagination] = useState<Pagination>()

  useEffect(() => {
    onSelectedKeywordsChange(selectedKeywords)
  }, [selectedKeywords])

  const onSelectedKeywordsChange = async (keywords: Data<Keyword>[]) => {
    const filterResponse = await filterCoursesOnKeywords(
      keywords.map((selectedKeyword) => selectedKeyword.attributes.Keyword)
    )

    setFilterResults(filterResponse.data)
    setPagination(filterResponse.meta.pagination)
  }

  return (
    <div className="container">
      <h1>Discover</h1>
      <div>
        <Filter
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
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
