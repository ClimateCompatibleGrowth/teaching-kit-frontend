import React from 'react'
import { Data, LectureTwoLevelsDeep } from '../../../types'

export type Props = { lecture: Data<LectureTwoLevelsDeep> }

const LectureDocxDownload = ({ lecture }: Props) => {
  return (
    <div>
      <h1>{lecture.attributes.Title}</h1>
    </div>
  )
}

export default LectureDocxDownload
