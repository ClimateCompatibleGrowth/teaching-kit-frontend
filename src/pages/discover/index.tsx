import { useEffect, useState } from 'react'
import Filter from '../../components/Filter/Filter'
import { filterCoursesOnKeywords } from '../../shared/requests/filter/filter'
import { Data, Keyword } from '../../types'

export default function Discover() {
  const [selectedKeywords, setSelectedKeywords] = useState<Data<Keyword>[]>([])
  const [filterResults, setFilterResults] = useState<any[]>([])

  useEffect(() => {
    onSelectedKeywordsChange(selectedKeywords)
  }, [selectedKeywords])

  const onSelectedKeywordsChange = async (keywords: Data<Keyword>[]) => {
    const filterResults = await filterCoursesOnKeywords(
      keywords.map((selectedKeyword) => selectedKeyword.attributes.Keyword)
    )

    setFilterResults(filterResults)
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
      <div></div>
    </div>
  )
}
