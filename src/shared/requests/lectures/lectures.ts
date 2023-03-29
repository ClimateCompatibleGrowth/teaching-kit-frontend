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
  const populateBlockAuthors = 'populate[Blocks][populate][Authors]=*'
  const populateKeywords = 'populate[Blocks][populate][Keywords]=*'
  const populateLevel = 'populate[Level][populate]=Level'
  const populateLocalizationsLevel =
    'populate[localizations][populate][Level]=*'
  const populateLocalizationsBlocks =
    'populate[localizations][populate][Blocks]=*'
  return `${populateKeywords}&${populateBlockAuthors}&${populateLectureCreators}&${populateLevel}&${populateLocalizationsLevel}&${populateLocalizationsBlocks}`
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
  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
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

  const populateLevel = `populate[Level][populate]=Level`
  const populateDuration = `populate[Blocks][populate]=DurationInMinutes`
  const populateLocalizations = `populate=localizations`
  const populate = `${populateLevel}&${populateDuration}&${populateLocalizations}`

  const locale = `locale=${_locale}`

  const response: ResponseArray<LectureTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}?${pagination}&${populate}&${locale}`
  )
  return response.data.data
}
