import { SortOptionType } from '../../../components/TabGroup/TabGroup'
import { LearningMaterialType } from '../../../types'

export type FilterParameters = {
  keywords: string[]
  authors: string[]
  pageNumber: number
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
    case 'LEVEL_ASC':
      return 'sort=Level[Level]:asc'
    case 'LEVEL_DESC':
      return 'sort=Level[Level]:desc'
  }
}

// andGroup is a Strapi query functionality that is not very well documented at the time of writing. See more here:
// https://forum.strapi.io/t/advanced-api-filter-combining-and-and-or/24375
const getFilterStringByAuthor = (
  author: string,
  filterFrom: LearningMaterialType,
  andGroup: number
) => {
  switch (filterFrom) {
    case 'COURSE':
      return `filters[$and][${andGroup}][$or][0][CourseCreators][Name][$containsi]=${author}&filters[$and][${andGroup}][$or][1][Lectures][LectureCreators][Name][$containsi]=${author}&filters[$and][${andGroup}][$or][2][Lectures][Blocks][Authors][Name][$containsi]=${author}`
    case 'LECTURE':
      return `filters[$and][${andGroup}][$or][0][LectureCreators][Name][$containsi]=${author}&filters[$and][${andGroup}][$or][1][Blocks][Authors][Name][$containsi]=${author}`
    case 'BLOCK':
      return `filters[$and][${andGroup}][$or][0][Authors][Name][$containsi]=${author}`
  }
}

export const getKeywordsFilterString = (
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
    case 'BLOCK':
      return `filters[$and][${andGroupStartIndex}][$and][${andGroup}][Keywords][Keyword][$containsi]=${keyword}`
  }
}
