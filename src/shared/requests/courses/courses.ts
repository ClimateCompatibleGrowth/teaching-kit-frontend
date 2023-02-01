import axios from 'axios'
import {
  getAuthorsAndKeywordsFilterString,
  getSortString,
} from '../utils/utils'
import { CourseThreeLevelsDeep, CourseTwoLevelsDeep } from '../../../types'
import { ResponseArray } from '../types'
import { SortOptionType } from '../../../components/TabGroup/TabGroup'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/courses`
const DEFAULT_MATCHES_PER_PAGE = 10

const getPopulateString = () => {
  const populateCourseCreators = 'populate[CourseCreators][populate]=*'
  const populateLectureCreators =
    'populate[Lectures][populate][LectureCreators]=*'
  const populateBlockAuthors =
    'populate[Lectures][populate][Blocks][populate][Authors]=*'
  const populateKeywords =
    'populate[Lectures][populate][Blocks][populate][Keywords]=*'
  const populateLevel = 'populate[Level][populate]=Level'
  return `${populateKeywords}&${populateCourseCreators}&${populateLectureCreators}&${populateBlockAuthors}&${populateLevel}`
}

export const filterCourseOnKeywordsAndAuthors = async (
  keywords: string[],
  authors: string[],
  pageNumber: number,
  sortMethod: SortOptionType,
  matchesPerPage?: number
) => {
  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
  }`

  const sort = getSortString(sortMethod)

  const authorsAndKeywordsFilterString = getAuthorsAndKeywordsFilterString(
    authors,
    keywords,
    'COURSE'
  )

  const populate = getPopulateString()

  const filters = `${pagination}${authorsAndKeywordsFilterString}`
  const filterString =
    filters.length > 0
      ? `${filters}&${populate}&${sort}`
      : `?${populate}&${sort}`
  const response: ResponseArray<CourseThreeLevelsDeep> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}

export const getRecentCourses = async (limit = 30) => {
  const pagination = `pagination[limit]=${limit}&sort[0]=publishedAt&sort[1]=createdAt`
  const populate = `populate[Level]=Level&populate[Lectures][populate][Blocks]=DurationInMinutes`
  const response: ResponseArray<CourseTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}?${pagination}&${populate}`
  )
  return response.data.data
}
