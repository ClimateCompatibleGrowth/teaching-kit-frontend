import axios from 'axios'
import { DEFAULT_LOCALE } from '../../../contexts/LocaleContext'
import { BlockOneLevelDeep, Locale } from '../../../types'
import { BlockSortOptionType } from '../../../types/filters'
import { ResponseArray, ResponseArrayData } from '../types'
import {
  FilterParameters,
  getAuthorsAndKeywordsFilterString,
  getSortString,
} from '../utils/utils'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blocks`
const DEFAULT_MATCHES_PER_PAGE = 10

export const filterBlockOnKeywordsAndAuthors = async ({
  keywords,
  authors,
  pageNumber,
  matchesPerPage,
  sortMethod,
}: FilterParameters<BlockSortOptionType>): Promise<
  ResponseArrayData<BlockOneLevelDeep>
> => {
  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
  }`

  const sort = getSortString(sortMethod)

  const authorsAndKeywordsFilterString = getAuthorsAndKeywordsFilterString(
    authors,
    keywords,
    'BLOCK'
  )

  const filters = `${pagination}${authorsAndKeywordsFilterString}`
  const filterString =
    filters.length > 0 ? `${filters}&${sort}&populate=*` : `&${sort}?populate=*`
  const response: ResponseArray<BlockOneLevelDeep> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}

export const getRecentBlocks = async (
  _locale: Locale = DEFAULT_LOCALE,
  limit = 30
) => {
  const pagination = `pagination[limit]=${limit}&sort[0]=publishedAt&sort[1]=createdAt`
  const locale = `locale=${_locale}`
  const response: ResponseArray<BlockOneLevelDeep> = await axios.get(
    `${ENDPOINT}?${pagination}&${locale}`
  )
  return response.data.data
}
