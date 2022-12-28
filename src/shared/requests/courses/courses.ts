import axios from 'axios'
import {
  Course,
  CourseThreeLevelsDeep,
  CourseTwoLevelsDeep,
} from '../../../types'
import { Response, ResponseArray, ResponseArrayData } from '../types'
import {
  FilterParameters,
  getAuthorsFilterString,
  getKeywordsFilterString,
} from '../utils'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/courses`
const DEFAULT_MATCHES_PER_PAGE = 10

export const getCourses = async () => {
  const response: ResponseArray<Course> = await axios.get(ENDPOINT)
  return response.data.data
}

export const getCourseWithLecturesAndBlocks = async (courseId: string) => {
  const response: Response<CourseThreeLevelsDeep> = await axios.get(
    `${ENDPOINT}/${courseId}?populate[Lectures][populate][0]=Blocks`
  )
  return response.data.data
}

export const filterCourseOnKeywordsAndAuthors = async ({
  keywords,
  authors,
  pageNumber,
  matchesPerPage,
}: FilterParameters): Promise<ResponseArrayData<CourseTwoLevelsDeep>> => {
  const keywordsFilterString = getKeywordsFilterString(
    keywords,
    '[Lectures][Blocks][Keywords][Keyword]'
  )
  const authorsFilterString = getAuthorsFilterString(authors, 'COURSE')

  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
  }`

  const andKeywords = keywordsFilterString.length > 0 ? '&' : ''
  const andAuthors = authorsFilterString.length > 0 ? '&' : ''

  const filters = `${pagination}${andKeywords}${keywordsFilterString}${andAuthors}${authorsFilterString}`
  const filterString =
    filters.length > 0 ? `${filters}&populate=*` : '?populate=*'
  const response: ResponseArray<CourseTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}
