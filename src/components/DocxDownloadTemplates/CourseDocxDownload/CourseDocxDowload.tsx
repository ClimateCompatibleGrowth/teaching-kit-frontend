import React from 'react'
import { CourseThreeLevelsDeep, Data } from '../../../types'

import * as Styled from '../styles'

export type Props = { course: Data<CourseThreeLevelsDeep> }

const CourseDocxDownload = ({ course }: Props) => {
  return (
    <Styled.DocxDownloadWrapper>
      <h1>{course.attributes.Title}</h1>
    </Styled.DocxDownloadWrapper>
  )
}

export default CourseDocxDownload
