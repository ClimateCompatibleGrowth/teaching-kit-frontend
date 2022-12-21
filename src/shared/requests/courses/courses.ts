import axios from 'axios'
import { Course, TwoLevelsDeepCourse } from '../../../types'
import { Response, ResponseArray } from '../types'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/courses`
const DEFAULT_MATCHES_PER_PAGE = 10

export const getCourses = async () => {
  const response: ResponseArray<Course> = await axios.get(ENDPOINT)
  return response.data.data
}

export const getCourseWithLecturesAndBlocks = async (courseId: string) => {
  const response: Response<TwoLevelsDeepCourse> = await axios.get(
    `${ENDPOINT}/${courseId}?populate[Lectures][populate][0]=Blocks`
  )
  return response.data.data
}

const getKeywordsFilterString = (keywords: string[]) => {
  return keywords.reduce((filterString, keyword, index) => {
    if (index !== 0) {
      return (
        filterString +
        `&filters[Lectures][Blocks][Keywords][Keyword][$containsi]=${keyword}`
      )
    }
    return (
      filterString +
      `filters[Lectures][Blocks][Keywords][Keyword][$containsi]=${keyword}`
    )
  }, '')
}

const getAuthorsFilterString = (authors: string[]) => {
  return authors.map((author) => getFilterStringByAuthor(author)).join('&')
}

export const filterCoursesOnKeywords = async (keywords: string[]) => {
  const filterString = getKeywordsFilterString(keywords)
  const response: ResponseArray<Course> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}

const getFilterStringByAuthor = (author: string) => {
  const matchesCourseCreator = `filters[$or][0][CourseCreator][Name][$containsi]=${author}`
  const matchesLectureCreator = `filters[$or][1][Lectures][LectureCreator][Name][$containsi]=${author}`
  const matchesBlockAuthor = `filters[$or][2][Lectures][Blocks][Authors][Name][$containsi]=${author}`
  return `${matchesCourseCreator}&${matchesLectureCreator}&${matchesBlockAuthor}`
}

export const filterCourseOnKeywordsAndAuthors = async (
  keywords: string[],
  authors: string[],
  pageNumber: number,
  matchesPerPage?: number
) => {
  const keywordsFilterString = getKeywordsFilterString(keywords)
  const authorsFilterString = getAuthorsFilterString(authors)

  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
  }`

  const andKeywords = keywordsFilterString.length > 0 ? '&' : ''
  const andAuthors = authorsFilterString.length > 0 ? '&' : ''

  const filterString = `${pagination}${andKeywords}${keywordsFilterString}${andAuthors}${authorsFilterString}`
  const response: ResponseArray<Course> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}
