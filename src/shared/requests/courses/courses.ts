import axios from "axios"
import { Course } from "../../../types"
import { ResponseArray } from "../types"

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/courses`

export const getCourses = async () => {
  const response: ResponseArray<Course> = await axios.get(ENDPOINT)
  return response.data.data
}

export const filterCoursesOnKeywords = async (keywords: string[]) => {
  const filterString = keywords.reduce((filterString, keyword, index) => {
    if (index !== 0) {
      return filterString + `&filters[Lectures][Blocks][Keywords][Keyword][$containsi]=${keyword}`
    }
    return filterString + `?filters[Lectures][Blocks][Keywords][Keyword][$containsi]=${keyword}`
  }, "")
  const response: ResponseArray<Course> = await axios.get(`${ENDPOINT}${filterString}`)
  return response.data;
}