import axios from 'axios'
import { InternalApiError } from '../shared/error/internal-api-error'
import { Response } from '../shared/requests/types'
import { BlockTwoLevelsDeep, Data } from '../types'

const ENDPOINT = `${process.env.STRAPI_API_URL}/blocks`

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
    `${ENDPOINT}/${id}?${populateAuthor}&${populateKeywords}`
  )
  return response.data.data
}
