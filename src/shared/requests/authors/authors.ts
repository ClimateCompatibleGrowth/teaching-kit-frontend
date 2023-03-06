import axios from 'axios'
import { Author, Data } from '../../../types'
import { ResponseArray } from '../types'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/authors`

export const searchForAuthors = async (
  searchTerm: string
): Promise<Data<Author>[]> => {
  console.log(searchTerm)
  const filters =
    searchTerm !== ''
      ? `?filters[$or][0][FirstName][$containsi]=${searchTerm}&populate=*&filters[$or][1][LastName][$containsi]=${searchTerm}&filters[$or][2][Email][$containsi]=${searchTerm}&filters[$or][3][ORCID][$containsi]=${searchTerm}`
      : ''
  const response: ResponseArray<Author> = await axios.get(
    `${ENDPOINT}${filters}`
  )
  return response.data.data
}
