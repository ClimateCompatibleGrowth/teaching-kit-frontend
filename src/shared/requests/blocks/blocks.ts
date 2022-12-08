import axios from "axios"
import { Block } from "../../../types"
import { ResponseArray } from "../types"

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blocks`

export const getBlocks = async () => {
  const response: ResponseArray<Block> = await axios.get(ENDPOINT)
  return response.data.data
}