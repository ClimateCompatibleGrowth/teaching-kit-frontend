import axios from 'axios'
import { getAuthorsAndKeywordsFilterString } from '../utils/utils'
import { CourseThreeLevelsDeep } from '../../../types'
import { ResponseArray } from '../types'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/courses`
const DEFAULT_MATCHES_PER_PAGE = 10

const getPopulateString = () => {
  const populateCourseCreator = 'populate[CourseCreator][populate]=*'
  const populateLectureCreator =
    'populate[Lectures][populate][LectureCreator]=*'
  const populateBlockAuthors =
    'populate[Lectures][populate][Blocks][populate][Authors]=*'
  const populateKeywords =
    'populate[Lectures][populate][Blocks][populate][Keywords]=*'
  return `${populateKeywords}&${populateCourseCreator}&${populateLectureCreator}&${populateBlockAuthors}`
}

export const filterCourseOnKeywordsAndAuthors = async (
  keywords: string[],
  authors: string[],
  pageNumber: number,
  matchesPerPage?: number
) => {
  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
  }`

  const authorsAndKeywordsFilterString = getAuthorsAndKeywordsFilterString(
    authors,
    keywords,
    'COURSE'
  )

  const populate = getPopulateString()

  const filters = `${pagination}${authorsAndKeywordsFilterString}`
  const filterString =
    filters.length > 0 ? `${filters}&${populate}` : `?${populate}`
  const response: ResponseArray<CourseThreeLevelsDeep> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}
