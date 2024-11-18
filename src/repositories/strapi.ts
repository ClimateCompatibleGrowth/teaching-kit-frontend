import axios from 'axios'
import { InternalApiError } from '../shared/error/internal-api-error'
import { Response } from '../shared/requests/types'
import {
  CourseThreeLevelsDeep,
  Data,
  LectureTwoLevelsDeep,
} from '../types'

const ENDPOINT = `${process.env.STRAPI_API_URL}`

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
  const response: Response<LectureTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}/lectures/${id}?${populateLectureCreator}`
  )
  return response.data.data
}

export const getCourse = async (
  id: number
): Promise<Data<CourseThreeLevelsDeep>> => {
  if (typeof id !== 'number') {
    throw new InternalApiError(
      `Unable to fetch Strapi course. Expected a numerical id, got '${id}' (type: ${typeof id})`
    )
  }
  const populateCourseCreator =
    'populate[CourseCreators][populate][Affiliation]=*'
  const response: Response<CourseThreeLevelsDeep> = await axios.get(
    `${ENDPOINT}/courses/${id}?${populateCourseCreator}`
  )
  return response.data.data
}
