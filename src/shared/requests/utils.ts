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
  const matchesCourseCreator = (index: number) =>
    `filters[$or][${index}][CourseCreator][Name][$containsi]=${author}`
  const matchesLectureCreator = (index: number) =>
    `filters[$or][${index}][Lectures][LectureCreator][Name][$containsi]=${author}`
  const matchesBlockAuthor = (index: number) =>
    `filters[$or]${index}][Lectures][Blocks][Authors][Name][$containsi]=${author}`

  switch (filterFrom) {
    case 'COURSE':
      return `${matchesCourseCreator(0)}&${matchesLectureCreator(
        1
      )}&${matchesBlockAuthor(2)}`
    case 'LECTURE':
      return `${matchesLectureCreator(0)}&${matchesBlockAuthor(1)}`
    case 'BLOCK':
      return `${matchesBlockAuthor(0)}`
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
