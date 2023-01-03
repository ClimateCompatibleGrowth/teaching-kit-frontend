import { LearningMaterialType } from '../../types'

export type FilterParameters = {
  keywords: string[]
  authors: string[]
  pageNumber: number
  matchesPerPage?: number
}

export const getAuthorsFilterString = (
  authors: string[],
  filterFrom: LearningMaterialType
) => {
  return authors
    .map((author) => getFilterStringByAuthor(author, filterFrom))
    .join('&')
}

const getFilterStringByAuthor = (
  author: string,
  filterFrom: LearningMaterialType
) => {
  switch (filterFrom) {
    case 'COURSE':
      return `filters[$or][0][CourseCreator][Name][$containsi]=${author}&filters[$or][1][Lectures][LectureCreator][Name][$containsi]=${author}&filters[$or][2][Lectures][Blocks][Authors][Name][$containsi]=${author}`
    case 'LECTURE':
      return `filters[$or][0][LectureCreator][Name][$containsi]=${author}&filters[$or][1][Blocks][Authors][Name][$containsi]=${author}`
    case 'BLOCK':
      return `filters[$or][0][Authors][Name][$containsi]=${author}`
  }
}

export const getKeywordsFilterString = (
  keywords: string[],
  pathToKeywords: string
) => {
  return keywords
    .map((keyword) => `filters${pathToKeywords}[$containsi]=${keyword}`)
    .join('&')
}
