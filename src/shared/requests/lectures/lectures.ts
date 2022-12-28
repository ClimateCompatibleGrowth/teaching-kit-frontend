import axios from 'axios'
import { Lecture, LectureTwoLevelsDeep } from '../../../types'
import { ResponseArray, ResponseArrayData } from '../types'
import {
  FilterParameters,
  getAuthorsFilterString,
  getKeywordsFilterString,
} from '../utils'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/lectures`
const DEFAULT_MATCHES_PER_PAGE = 10

export const getLectures = async () => {
  const response: ResponseArray<Lecture> = await axios.get(ENDPOINT)
  return response.data.data
}

export const filterLectureOnKeywordsAndAuthors = async ({
  keywords,
  authors,
  pageNumber,
  matchesPerPage,
}: FilterParameters): Promise<ResponseArrayData<LectureTwoLevelsDeep>> => {
  const keywordsFilterString = getKeywordsFilterString(
    keywords,
    '[Blocks][Keywords][Keyword]'
  )
  const authorsFilterString = getAuthorsFilterString(authors, 'LECTURE')

  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
  }`

  const andKeywords = keywordsFilterString.length > 0 ? '&' : ''
  const andAuthors = authorsFilterString.length > 0 ? '&' : ''

  const filters = `${pagination}${andKeywords}${keywordsFilterString}${andAuthors}${authorsFilterString}`
  const filterString =
    filters.length > 0 ? `${filters}&populate=*` : '?populate=*'
  const response: ResponseArray<LectureTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}
