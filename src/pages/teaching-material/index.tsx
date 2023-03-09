import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown'
import TabGroup from '../../components/TabGroup/TabGroup'
import { searchForAuthors } from '../../shared/requests/authors/authors'
import { filterBlockOnKeywordsAndAuthors } from '../../shared/requests/blocks/blocks'
import { filterCourseOnKeywordsAndAuthors } from '../../shared/requests/courses/courses'
import { searchForKeywords } from '../../shared/requests/keywords/keywords'
import { filterLectureOnKeywordsAndAuthors } from '../../shared/requests/lectures/lectures'
import { ResponseArrayData } from '../../shared/requests/types'
import { mq, PageContainer, VisuallyHidden } from '../../styles/global'
import {
  BlockOneLevelDeep,
  CourseThreeLevelsDeep,
  LectureTwoLevelsDeep,
} from '../../types'
import {
  isBlockSortOptionType,
  Item,
  SortOption,
  sortOptions,
} from '../../types/filters'

// Note that Strapi's default value for page sizes currently is 25. Hence,
// if this constant is increased to > 25, we will still only get 25 results.
const MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN = 20

const FilterGroup = styled.div`
  margin-bottom: 4rem;
  ${mq.sm} {
    margin-bottom: 0;
    display: flex;
    gap: 1.6rem;
    flex-wrap: no-wrap;
  }
`

const H1 = styled.h1`
  margin-bottom: 4rem;
  ${mq.sm} {
    margin-bottom: 6.4rem;
  }
`

const H2 = styled.h2`
  font-size: 2rem;

  ${mq.sm} {
    font-size: 2.8rem;
  }
`

const Styled = { FilterGroup, H1, H2 }

export const DEFAULT_PAGE_NUMBER = 1
export const DEFAULT_MATCHES_PER_PAGE = 10

const defaultPagination = {
  page: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_MATCHES_PER_PAGE,
  pageCount: 1,
  total: 0,
}

const defaultFilterResult: ResponseArrayData<any> = {
  data: [],
  meta: {
    pagination: defaultPagination,
  },
}

export default function TeachingMaterial() {
  const [hasAnyChangeHappened, setHasAnyChangeHappened] =
    useState<boolean>(false)
  const [selectedKeywords, setSelectedKeywords] = useState<Item[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<Item[]>([])
  const [selectedSort, setSelectedSort] = useState<SortOption>(
    sortOptions.alphabeticalASC
  )

  const [currentCoursePageNumber, setCurrentCoursePageNumber] =
    useState(DEFAULT_PAGE_NUMBER)
  const [currentLecturePageNumber, setCurrentLecturePageNumber] =
    useState(DEFAULT_PAGE_NUMBER)
  const [currentBlockPageNumber, setCurrentBlockPageNumber] =
    useState(DEFAULT_PAGE_NUMBER)

  const [results, setResults] = useState<{
    courses: ResponseArrayData<CourseThreeLevelsDeep>
    lectures: ResponseArrayData<LectureTwoLevelsDeep>
    blocks: ResponseArrayData<BlockOneLevelDeep>
  }>({
    courses: defaultFilterResult,
    lectures: defaultFilterResult,
    blocks: defaultFilterResult,
  })

  const summaryId = 'content-results-summary'

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
        id: matchingAuthor.attributes.ORCID.toString(),
        label: `${matchingAuthor.attributes.FirstName} ${matchingAuthor.attributes.LastName}`,
      }))
    },
    []
  )

  const getResultsSummary = () => {
    if (!hasAnyChangeHappened) {
      return ''
    }
    const dataResults = `showing ${results.courses.data.length} course${
      results.courses.data.length > 1 ? 's' : ''
    }, ${results.lectures.data.length} lecture${
      results.lectures.data.length > 1 ? 's' : ''
    }, and ${results.blocks.data.length} lecture block${
      results.blocks.data.length > 1 ? 's' : ''
    }.`
    const authorPart =
      selectedAuthors.length !== 0
        ? `${selectedAuthors.length} author${
            selectedAuthors.length > 1 ? 's' : ''
          }.`
        : ''
    const keywordPart =
      selectedKeywords.length !== 0
        ? `${selectedKeywords.map((k) => k.ariaLabel || k.label).join(', ')}`
        : ''
    const isFiltered = keywordPart || authorPart
    const sortedByPart = `Sorted ${selectedSort.ariaLabel}`
    const fullSummary = `${dataResults} ${
      isFiltered ? 'Filtered by' : ''
    } ${keywordPart} ${
      keywordPart && authorPart ? 'and' : ''
    } ${authorPart} ${sortedByPart}`
    return fullSummary
  }

  const onChange = useCallback(async () => {
    const keywords = selectedKeywords.map((keyword) => keyword.label)
    const authors = selectedAuthors.map((author) => author.id)
    const courseFilterPromise = filterCourseOnKeywordsAndAuthors(
      keywords,
      authors,
      currentCoursePageNumber,
      selectedSort.id,
      DEFAULT_MATCHES_PER_PAGE
    )
    const lectureFilterPromise = filterLectureOnKeywordsAndAuthors({
      keywords,
      authors,
      pageNumber: currentLecturePageNumber,
      sortMethod: selectedSort.id,
      matchesPerPage: DEFAULT_MATCHES_PER_PAGE,
    })
    const blockFilterPromise = filterBlockOnKeywordsAndAuthors({
      keywords,
      authors,
      pageNumber: currentBlockPageNumber,
      sortMethod: isBlockSortOptionType(selectedSort.id)
        ? selectedSort.id
        : 'ALPHABETICAL_ASC',
      matchesPerPage: DEFAULT_MATCHES_PER_PAGE,
    })
    const [courseFilterResult, lectureFilterResult, blockFilterResult] =
      await Promise.all([
        courseFilterPromise,
        lectureFilterPromise,
        blockFilterPromise,
      ])

    setResults({
      courses: courseFilterResult,
      lectures: lectureFilterResult,
      blocks: blockFilterResult,
    })
  }, [selectedKeywords, selectedAuthors, selectedSort])

  useEffect(() => {
    if (selectedKeywords.length > 1 || selectedAuthors.length > 1) {
      setHasAnyChangeHappened(true)
    }
    onChange()
  }, [
    selectedKeywords.length,
    selectedAuthors.length,
    selectedSort.id,
    onChange,
  ])

  return (
    <PageContainer hasTopPadding hasBottomPadding>
      <Styled.H1>Teaching Material</Styled.H1>
      <div>
        <Styled.H2>Apply filter</Styled.H2>
        <Styled.FilterGroup>
          <Dropdown
            controls={summaryId}
            id='keyword-options'
            selectedItems={selectedKeywords}
            setSelectedItems={setSelectedKeywords}
            label='Keyword'
            placeholder='Select Keywords'
            ariaLabel='Keywords to pick from'
            maxAmountOfItems={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
            getItems={getMatchingKeywords}
          />
          <Dropdown
            controls={summaryId}
            id='author-options'
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
      <Styled.H2>All Teaching Material</Styled.H2>
      <VisuallyHidden>
        <p id={summaryId} aria-live='polite'>
          {getResultsSummary()}
        </p>
      </VisuallyHidden>
      <div>
        <TabGroup
          controls={summaryId}
          courseResults={results.courses}
          lectureResults={results.lectures}
          blockResults={results.blocks}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          selectedKeywords={selectedKeywords.map(
            (selectedKeyword) => selectedKeyword.label
          )}
          selectedAuthors={selectedAuthors.map(
            (selectedAuthor) => selectedAuthor.label
          )}
          currentCoursePageNumber={currentCoursePageNumber}
          currentLecturePageNumber={currentLecturePageNumber}
          currentBlockPageNumber={currentBlockPageNumber}
          setCurrentCoursePageNumber={setCurrentCoursePageNumber}
          setCurrentLecturePageNumber={setCurrentLecturePageNumber}
          setCurrentBlockPageNumber={setCurrentBlockPageNumber}
        />
      </div>
    </PageContainer>
  )
}
