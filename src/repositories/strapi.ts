import axios from 'axios'
import { InternalApiError } from '../shared/error/internal-api-error'
import { BlockOneLevelDeep } from '../types'

const ENDPOINT = `${process.env.STRAPI_API_URL}/blocks`

export const getBlock = async (id: number): Promise<BlockOneLevelDeep> => {
  if (typeof id !== 'number') {
    throw new InternalApiError(
      `Unable to fetch Strapi block. Expected a numerical id, got '${id}' (type: ${typeof id})`
    )
  }
  return await axios.get(`${ENDPOINT}/${id}?populate=*`)
}
