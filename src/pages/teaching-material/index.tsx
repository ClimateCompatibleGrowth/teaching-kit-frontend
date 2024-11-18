import styled from '@emotion/styled'
import axios from 'axios'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown'
import TabGroup from '../../components/TabGroup/TabGroup'
import { getFilteredCourses } from '../../services/strapi-locale-filter'
import { searchForAuthors } from '../../shared/requests/authors/authors'
import { searchForKeywords } from '../../shared/requests/keywords/keywords'
import { ResponseArray, ResponseArrayData } from '../../shared/requests/types'
import { mq, PageContainer, VisuallyHidden } from '../../styles/global'
import {
  CourseThreeLevelsDeep,
  FilterPageCopy,
  Data,
  Locale,
  GeneralCopy,
} from '../../types'
import {
  Item,
  SortOption,
  sortOptions,
  SortOptionType,
  getSortOptionKey,
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

const getTranslatedSort = (sortOptionType: SortOptionType) => {
  const sortOptionKey = getSortOptionKey(sortOptionType)
  return sortOptions[sortOptionKey]
}

type Props = {
  pageCopy: Data<FilterPageCopy>
  generalCopy: Data<GeneralCopy>
}

export default function TeachingMaterial({ pageCopy, generalCopy }: Props) {
  const { locale: _locale } = useRouter()
  const locale = _locale as Locale

  const [hasAnyChangeHappened, setHasAnyChangeHappened] =
    useState<boolean>(false)
  const [selectedKeywords, setSelectedKeywords] = useState<Item[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<Item[]>([])
  const [selectedSort, setSelectedSort] = useState<SortOption>(
    getTranslatedSort('ALPHABETICAL_ASC')
  )

  const [currentCoursePageNumber, setCurrentCoursePageNumber] =
    useState(DEFAULT_PAGE_NUMBER)

  const [results, setResults] = useState<{
    courses: ResponseArrayData<CourseThreeLevelsDeep>
  }>({
    courses: defaultFilterResult,
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
    const dataResults = `showing ${results.courses.data.length} course${results.courses.data.length > 1 ? 's' : ''}.`
    const authorPart =
      selectedAuthors.length !== 0
        ? `${selectedAuthors.length} author${selectedAuthors.length > 1 ? 's' : ''
        }.`
        : ''
    const keywordPart =
      selectedKeywords.length !== 0
        ? `${selectedKeywords.map((k) => k.ariaLabel || k.label).join(', ')}`
        : ''
    const isFiltered = keywordPart || authorPart
    const sortedByPart = `Sorted ${selectedSort.ariaLabel}`
    const fullSummary = `${dataResults} ${isFiltered ? 'Filtered by' : ''
      } ${keywordPart} ${keywordPart && authorPart ? 'and' : ''
      } ${authorPart} ${sortedByPart}`
    return fullSummary
  }

  const onChange = useCallback(async () => {
    const keywords = selectedKeywords.map((keyword) => keyword.label)
    const authors = selectedAuthors.map((author) => author.id)

    const courseFilterPromise = getFilteredCourses({
      keywords,
      authors,
      pageNumber: currentCoursePageNumber,
      sortMethod: selectedSort.id,
      locale,
      matchesPerPage: DEFAULT_MATCHES_PER_PAGE,
    })

    const [courseFilterResult] =
      await Promise.all([
        courseFilterPromise,
      ])

    setResults({
      courses: courseFilterResult,
    })
  }, [
    selectedKeywords,
    selectedAuthors,
    selectedSort,
    locale,
    currentCoursePageNumber, // Could be improved so that the function does not re-run for all types when one's page number changes
  ])

  useEffect(() => {
    if (selectedKeywords.length > 0 || selectedAuthors.length > 0) {
      setHasAnyChangeHappened(true)
    }
    onChange()
  }, [
    selectedKeywords.length,
    selectedAuthors.length,
    selectedSort.id,
    onChange,
  ])

  useEffect(() => {
    setSelectedSort((previousSort) =>
      getTranslatedSort(previousSort.id)
    )
  }, [locale])

  const {
    Header,
    FilterHeader,
    KeywordDropdown,
    AuthorDropdown,
    DefaultFilterResultHeader,
    FilterResultHeader,
  } = pageCopy.attributes

  const { TranslationDoesNotExist } = generalCopy.attributes

  return (
    <PageContainer hasTopPadding hasBottomPadding>
      <Styled.H1>{Header}</Styled.H1>
      <div>
        <Styled.H2>{FilterHeader}</Styled.H2>
        <Styled.FilterGroup>
          <Dropdown
            controls={summaryId}
            id='keyword-options'
            selectedItems={selectedKeywords}
            setSelectedItems={setSelectedKeywords}
            label={KeywordDropdown.Label}
            placeholder={KeywordDropdown.Placeholder}
            ariaLabel={KeywordDropdown.AriaLabel}
            maxAmountOfItems={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
            getItems={getMatchingKeywords}
            sortByLabel
          />
          <Dropdown
            controls={summaryId}
            id='author-options'
            selectedItems={selectedAuthors}
            setSelectedItems={setSelectedAuthors}
            label={AuthorDropdown.Label}
            placeholder={AuthorDropdown.Placeholder}
            ariaLabel={AuthorDropdown.AriaLabel}
            maxAmountOfItems={MAX_AMOUNT_OF_FILTERS_IN_DROPDOWN}
            getItems={getMatchingAuthors}
            sortByLabel
          />
        </Styled.FilterGroup>
      </div>
      <Styled.H2>
        {hasAnyChangeHappened ? FilterResultHeader : DefaultFilterResultHeader}
      </Styled.H2>
      <VisuallyHidden>
        <p id={summaryId} aria-live='polite'>
          {getResultsSummary()}
        </p>
      </VisuallyHidden>
      <div>
        <TabGroup
          controls={summaryId}
          courseResults={results.courses}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          selectedKeywords={selectedKeywords.map(
            (selectedKeyword) => selectedKeyword.label
          )}
          selectedAuthors={selectedAuthors.map(
            (selectedAuthor) => selectedAuthor.label
          )}
          currentCoursePageNumber={currentCoursePageNumber}
          setCurrentCoursePageNumber={setCurrentCoursePageNumber}
          translationDoesNotExistCopy={TranslationDoesNotExist}
        />
      </div>
    </PageContainer>
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const populateHeroImage = 'populate[KeywordDropdown][populate]=*'
    const populateInfoCard = 'populate[AuthorDropdown][populate]=*'

    const populate = `${populateHeroImage}&${populateInfoCard}`

    const pageCopyRequest: Promise<ResponseArray<FilterPageCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-filter-pages?locale=${ctx.locale ?? ctx.defaultLocale
      }&${populate}`
    )

    const generalCopyRequest: Promise<ResponseArray<GeneralCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-generals?locale=${ctx.locale ?? ctx.defaultLocale
      }`
    )

    const [pageCopy, generalCopy] = await Promise.all([
      pageCopyRequest,
      generalCopyRequest,
    ])

    if (!pageCopy || pageCopy.data.data.length < 1) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        pageCopy: pageCopy.data.data[0],
        generalCopy: generalCopy.data.data[0],
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
