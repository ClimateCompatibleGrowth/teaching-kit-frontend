import axios from 'axios'
import { InternalApiError } from '../shared/error/internal-api-error'
import { Response } from '../shared/requests/types'
import { BlockTwoLevelsDeep, Data, LectureTwoLevelsDeep } from '../types'

const ENDPOINT = `${process.env.STRAPI_API_URL}`

export const getBlock = async (
  id: number
): Promise<Data<BlockTwoLevelsDeep>> => {
  if (typeof id !== 'number') {
    throw new InternalApiError(
      `Unable to fetch Strapi block. Expected a numerical id, got '${id}' (type: ${typeof id})`
    )
  }
  const populateAuthor = 'populate[Authors][populate][Affiliation]=*'
  const populateKeywords = 'populate[Keywords]=*'
  const response: Response<BlockTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}/blocks/${id}?${populateAuthor}&${populateKeywords}`
  )
  return response.data.data
}

export const getLecture = async (
  id: number
): Promise<Data<LectureTwoLevelsDeep>> => {
  if (typeof id !== 'number') {
    throw new InternalApiError(
      `Unable to fetch Strapi lecture. Expected a numerical id, got '${id}' (type: ${typeof id})`
    )
  }
  const populateLectureCreator =
    'populate[LectureCreators][populate][Affiliation]=*'
  const populateKeywords = 'populate[Blocks][populate][Keywords]=*'
  const response: Response<LectureTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}/lectures/${id}?${populateLectureCreator}&${populateKeywords}`
  )
  return response.data.data
}
