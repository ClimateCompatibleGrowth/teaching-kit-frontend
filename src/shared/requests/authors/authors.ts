import axios from "axios";
import { Author, Data } from "../../../types";
import { ResponseArray } from "../types"

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/authors`

export const searchForAuthors = async (searchTerm: string): Promise<Data<Author>[]> => {
  const response: ResponseArray<Author> = await axios.get(`${ENDPOINT}?filters[Name][$containsi]=${searchTerm}`)
  return response.data.data;
}