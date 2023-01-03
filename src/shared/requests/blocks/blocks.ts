import axios from 'axios'
import { Block, BlockOneLevelDeep } from '../../../types'
import { ResponseArray, ResponseArrayData } from '../types'
import {
  FilterParameters,
  getAuthorsFilterString,
  getKeywordsFilterString,
} from '../utils'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blocks`
const DEFAULT_MATCHES_PER_PAGE = 10

export const getBlocks = async () => {
  const response: ResponseArray<Block> = await axios.get(ENDPOINT)
  return response.data.data
}

export const filterBlockOnKeywordsAndAuthors = async ({
  keywords,
  authors,
  pageNumber,
  matchesPerPage,
}: FilterParameters): Promise<ResponseArrayData<BlockOneLevelDeep>> => {
  const keywordsFilterString = getKeywordsFilterString(
    keywords,
    '[Keywords][Keyword]'
  )
  const authorsFilterString = getAuthorsFilterString(authors, 'BLOCK')

  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
  }`

  const andKeywords = keywordsFilterString.length > 0 ? '&' : ''
  const andAuthors = authorsFilterString.length > 0 ? '&' : ''

  const filters = `${pagination}${andKeywords}${keywordsFilterString}${andAuthors}${authorsFilterString}`
  const filterString =
    filters.length > 0 ? `${filters}&populate=*` : '?populate=*'
  const response: ResponseArray<BlockOneLevelDeep> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}
