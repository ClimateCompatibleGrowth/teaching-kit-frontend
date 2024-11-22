import { LearningMaterialType, Locale } from '../../../types'
import { SortOptionType } from '../../../types/filters'

export type FilterParameters<SortType> = {
  keywords: string[]
  authors: string[]
  pageNumber: number
  sortMethod: SortType
  locale: Locale
  matchesPerPage?: number
}

type AuthorsFilters = {
  authorsFilterString: string
  amountOfFilters: number
}

export const getAuthorsAndKeywordsFilterString = (
  authors: string[],
  keywords: string[],
  filterFrom: LearningMaterialType
) => {
  const authorsFilter = getAuthorsFilterString(authors, filterFrom)
  const keywordsFilterString = getKeywordsFilterString(
    keywords,
    filterFrom,
    authorsFilter.amountOfFilters
  )

  const andKeywords = keywordsFilterString.length > 0 ? '&' : ''
  const andAuthors = authorsFilter.authorsFilterString.length > 0 ? '&' : ''

  return `${andKeywords}${keywordsFilterString}${andAuthors}${authorsFilter.authorsFilterString}`
}

export const getAuthorsFilterString = (
  authors: string[],
  filterFrom: LearningMaterialType
): AuthorsFilters => {
  const authorsFilters = authors.map((author, index) =>
    getFilterStringByAuthor(author, filterFrom, index)
  )

  const authorsFilterString = authorsFilters.join('&')
  return {
    authorsFilterString,
    amountOfFilters: authorsFilters.length,
  }
}

export const getSortString = (sortOption: SortOptionType) => {
  switch (sortOption) {
    case 'ALPHABETICAL_ASC':
      return 'sort=Title:asc'
    case 'ALPHABETICAL_DESC':
      return 'sort=Title:desc'
  }
}

// andGroup is a Strapi query functionality that is not very well documented at the time of writing. See more here:
// https://forum.strapi.io/t/advanced-api-filter-combining-and-and-or/24375
const getFilterStringByAuthor = (
  authorORCID: string,
  filterFrom: LearningMaterialType,
  andGroup: number
) => {
  switch (filterFrom) {
    case 'COURSE':
      return `filters[$and][${andGroup}][$or][0][CourseCreators][ORCID][$containsi]=${authorORCID}&filters[$and][${andGroup}][$or][1][Lectures][LectureCreators][ORCID][$containsi]=${authorORCID}`
    case 'LECTURE':
      return `filters[$and][${andGroup}][$or][0][LectureCreators][ORCID][$containsi]=${authorORCID}`
  }
}

const getKeywordsFilterString = (
  keywords: string[],
  filterFrom: LearningMaterialType,
  andGroupStartIndex = 0
) => {
  return keywords
    .map((keyword, index) =>
      getFilterStringByKeyword(keyword, filterFrom, index, andGroupStartIndex)
    )
    .join('&')
}

const getFilterStringByKeyword = (
  keyword: string,
  filterFrom: LearningMaterialType,
  andGroup: number,
  andGroupStartIndex: number
) => {
  switch (filterFrom) {
    case 'COURSE':
      return `filters[$and][${andGroupStartIndex}][$and][${andGroup}][Lectures][Blocks][Keywords][Keyword][$containsi]=${keyword}`
    case 'LECTURE':
      return `filters[$and][${andGroupStartIndex}][$and][${andGroup}][Blocks][Keywords][Keyword][$containsi]=${keyword}`
  }
}
