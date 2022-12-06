import axios from "axios"

interface Response<T> {
  data: {
    data: Data<T>[]
  }
}

export interface Data<T> {
  id: number;
  attributes: T;
}

export interface KeywordAttributes {
  Keyword: string
}

export const searchForKeywords = async (searchTerm: string): Promise<Data<KeywordAttributes>[]> => {
  const response: Response<KeywordAttributes> = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/keywords?filters[Keyword][$containsi]=${searchTerm}`
  )
  return response.data.data;
}