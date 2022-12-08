import axios from "axios"
import { Lecture } from "../../../types"
import { ResponseArray } from "../types"

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/lectures`

export const getLectures = async () => {
  const response: ResponseArray<Lecture> = await axios.get(ENDPOINT)
  return response.data.data
}