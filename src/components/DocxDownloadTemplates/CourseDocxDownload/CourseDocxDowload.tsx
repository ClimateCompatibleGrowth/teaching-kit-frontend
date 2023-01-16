import React from 'react'
import { CourseThreeLevelsDeep, Data } from '../../../types'

export type Props = { course: Data<CourseThreeLevelsDeep> }

const CourseDocxDownload = ({ course }: Props) => {
  return (
    <div>
      <h1>{course.attributes.Title}</h1>
    </div>
  )
}

export default CourseDocxDownload
