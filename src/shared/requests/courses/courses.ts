import axios from 'axios'
import {
  FilterParameters,
  getAuthorsAndKeywordsFilterString,
  getSortString,
} from '../utils/utils'
import {
  CourseThreeLevelsDeepWithThreeLevelsDeepLocalizations,
  CourseTwoLevelsDeep,
  Locale,
} from '../../../types'
import { ResponseArray, ResponseArrayData } from '../types'
import { SortOptionType } from '../../../types/filters'
import { DEFAULT_LOCALE } from '../../../contexts/LocaleContext'

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
  const populateLocalizationsLevel =
    'populate[localizations][populate][Level]=*'
  const populateLocalizationsLecturesBlocks =
    'populate[localizations][populate][Lectures][populate][Blocks]=*'
  return `${populateKeywords}&${populateCourseCreators}&${populateLectureCreators}&${populateBlockAuthors}&${populateLevel}&${populateLocalizationsLevel}&${populateLocalizationsLecturesBlocks}`
}

export const filterCourseOnKeywordsAndAuthors = async ({
  keywords,
  authors,
  pageNumber,
  sortMethod,
  matchesPerPage,
}: FilterParameters<SortOptionType>): Promise<
  ResponseArrayData<CourseThreeLevelsDeepWithThreeLevelsDeepLocalizations>
> => {
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
  const response: ResponseArray<CourseThreeLevelsDeepWithThreeLevelsDeepLocalizations> =
    await axios.get(`${ENDPOINT}${filterString}`)
  return response.data
}

export const getRecentCourses = async (
  _locale: Locale = DEFAULT_LOCALE,
  limit = 30
) => {
  const pagination = `pagination[limit]=${limit}&sort[0]=publishedAt&sort[1]=createdAt`
  const populate = `populate[Level]=Level&populate[Lectures][populate][Blocks]=DurationInMinutes`
  const locale = `locale=${_locale}`
  const response: ResponseArray<CourseTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}?${pagination}&${populate}&${locale}`
  )

  return response.data.data
}
