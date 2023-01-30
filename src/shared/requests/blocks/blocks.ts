import axios from 'axios'
import { BlockOneLevelDeep } from '../../../types'
import { ResponseArray, ResponseArrayData } from '../types'
import {
  FilterParameters,
  getAuthorsAndKeywordsFilterString,
} from '../utils/utils'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blocks`
const DEFAULT_MATCHES_PER_PAGE = 10

export const filterBlockOnKeywordsAndAuthors = async ({
  keywords,
  authors,
  pageNumber,
  matchesPerPage,
}: FilterParameters): Promise<ResponseArrayData<BlockOneLevelDeep>> => {
  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
  }`

  const authorsAndKeywordsFilterString = getAuthorsAndKeywordsFilterString(
    authors,
    keywords,
    'BLOCK'
  )

  const filters = `${pagination}${authorsAndKeywordsFilterString}`
  const filterString =
    filters.length > 0 ? `${filters}&populate=*` : '?populate=*'
  const response: ResponseArray<BlockOneLevelDeep> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}

export const getRecentBlocks = async (limit = 30) => {
  const filterRecents = `?pagination[limit]=${limit}&sort[0]=publishedAt&sort[1]=createdAt`
  const response: ResponseArray<BlockOneLevelDeep> = await axios.get(
    `${ENDPOINT}${filterRecents}`
  )
  return response.data.data
}
