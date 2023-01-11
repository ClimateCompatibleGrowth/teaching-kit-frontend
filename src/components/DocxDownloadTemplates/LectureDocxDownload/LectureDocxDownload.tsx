import React from 'react'
import { Data, LectureTwoLevelsDeep } from '../../../types'

import * as Styled from '../styles'

export type Props = { lecture: Data<LectureTwoLevelsDeep> }

const LectureDocxDownload = ({ lecture }: Props) => {
  return (
    <Styled.DocxDownloadWrapper>
      <h1>{lecture.attributes.Title}</h1>
    </Styled.DocxDownloadWrapper>
  )
}

export default LectureDocxDownload
