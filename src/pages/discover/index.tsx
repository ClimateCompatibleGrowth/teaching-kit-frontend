import { useState } from 'react'
import Filter from '../../components/Filter/Filter'
import { Data, KeywordAttributes } from '../../shared/requests/filter'

export default function Discover() {
  const [selectedKeywords, setSelectedKeywords] = useState<
    Data<KeywordAttributes>[]
  >([])

  return (
    <div className="container">
      <h1>Discover</h1>
      <div>
        <Filter
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
        />
      </div>
    </div>
  )
}
