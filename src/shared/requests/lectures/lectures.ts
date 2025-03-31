import axios from 'axios'
import { DEFAULT_LOCALE } from '../../../contexts/LocaleContext'
import {
  LectureTwoLevelsDeep,
  LectureTwoLevelsDeepWithOneLevelDeepLocalizations,
  Locale,
} from '../../../types'
import { SortOptionType } from '../../../types/filters'
import { ResponseArray, ResponseArrayData } from '../types'
import {
  FilterParameters,
  getAuthorsAndKeywordsFilterString,
  getSortString,
} from '../utils/utils'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/lectures`
const DEFAULT_MATCHES_PER_PAGE = 10

const getPopulateString = () => {
  const populateLectureCreators = 'populate[LectureCreators]=*'
  return `${populateLectureCreators}`
}

export const filterLectureOnKeywordsAndAuthors = async ({
  keywords,
  authors,
  pageNumber,
  matchesPerPage,
  sortMethod,
}: FilterParameters<SortOptionType>): Promise<
  ResponseArrayData<LectureTwoLevelsDeepWithOneLevelDeepLocalizations>
> => {
  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
    }`

  const sort = getSortString(sortMethod)

  const authorsAndKeywordsFilterString = getAuthorsAndKeywordsFilterString(
    authors,
    keywords,
    'LECTURE'
  )

  const populate = getPopulateString()

  const filters = `${pagination}${authorsAndKeywordsFilterString}`
  const filterString =
    filters.length > 0
      ? `${filters}&${populate}&${sort}`
      : `?${populate}&${sort}`
  const response: ResponseArray<LectureTwoLevelsDeepWithOneLevelDeepLocalizations> =
    await axios.get(`${ENDPOINT}${filterString}`)
  return response.data
}

export const getRecentLectures = async (
  _locale: Locale = DEFAULT_LOCALE,
  limit = 30
) => {
  const pagination = `pagination[limit]=${limit}&sort[0]=publishedAt&sort[1]=createdAt`

  const populateLocalizations = `populate=localizations`
  const populate = `${populateLocalizations}`

  const locale = `locale=${_locale}`

  const response: ResponseArray<LectureTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}?${pagination}&${populate}&${locale}`
  )
  return response.data.data
}
