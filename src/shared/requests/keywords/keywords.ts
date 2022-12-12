import axios from "axios";
import { Data, Keyword } from "../../../types";
import { ResponseArray } from "../types"

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/keywords`

export const searchForKeywords = async (searchTerm: string): Promise<Data<Keyword>[]> => {
  const response: ResponseArray<Keyword> = await axios.get(`${ENDPOINT}?filters[Keyword][$containsi]=${searchTerm}`)
  return response.data.data;
}