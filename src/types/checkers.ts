import {
  BlockOneLevelDeep,
  CourseThreeLevelsDeep,
  Data,
  DownloadableContent,
  LectureTwoLevelsDeep,
} from '.'

export const isBlockOneLevelDeep = (
  data: Data<DownloadableContent>
): data is Data<BlockOneLevelDeep> =>
  !!(data as Data<BlockOneLevelDeep>).attributes.Document
export const isLectureTwoLevelsDeep = (
  data: Data<DownloadableContent>
): data is Data<LectureTwoLevelsDeep> =>
  !!(data as Data<LectureTwoLevelsDeep>).attributes.Blocks
export const isCourseThreeLevelsDeep = (
  data: Data<DownloadableContent>
): data is Data<CourseThreeLevelsDeep> =>
  !!(data as Data<CourseThreeLevelsDeep>).attributes.Lectures &&
  !!(data as Data<CourseThreeLevelsDeep>).attributes.CourseCreators
