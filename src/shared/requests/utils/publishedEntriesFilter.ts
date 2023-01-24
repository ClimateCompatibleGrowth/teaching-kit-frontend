import {
  BlockOneLevelDeep,
  CourseThreeLevelsDeep,
  Data,
  LectureTwoLevelsDeep,
} from '../../../types'

// The functions in this file are unfortunately needed, because Strapi's API doesn't filter out
// published sub-relation, but instead returns every relation (published AND drafts)...
// https://github.com/strapi/strapi/issues/12665

export const filterOutOnlyPublishedEntriesOnCourse = (
  course: Data<CourseThreeLevelsDeep>
) => {
  const filteredResult = filterOutOnlyPublishedEntriesOnCourses([course])
  return filteredResult[0]
}

const filterOutOnlyPublishedEntriesOnCourses = (
  courses: Data<CourseThreeLevelsDeep>[]
) => {
  return courses
    .filter((course) => course.attributes.publishedAt !== null)
    .map((course) => {
      course.attributes.Lectures.data = filterOutOnlyPublishedEntriesOnLectures(
        course.attributes.Lectures.data
      )
      return course
    })
}

export const filterOutOnlyPublishedEntriesOnLecture = (
  lecture: Data<LectureTwoLevelsDeep>
) => {
  const filteredResult = filterOutOnlyPublishedEntriesOnLectures([lecture])
  return filteredResult[0]
}

const filterOutOnlyPublishedEntriesOnLectures = (
  lectures: Data<LectureTwoLevelsDeep>[]
) => {
  return lectures
    .filter((lecture) => lecture.attributes.publishedAt !== null)
    .map((lecture) => {
      lecture.attributes.Blocks.data = filterOutOnlyPublishedEntriesOnBlocks(
        lecture.attributes.Blocks.data
      )
      return lecture
    })
}

const filterOutOnlyPublishedEntriesOnBlocks = (
  blocks: Data<BlockOneLevelDeep>[]
) => {
  return blocks.filter((block) => block.attributes.publishedAt !== null)
}
