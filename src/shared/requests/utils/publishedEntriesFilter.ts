import {
  Course,
  CourseOneLevelDeep,
  CourseThreeLevelsDeep,
  CourseTwoLevelsDeep,
  Data,
  Lecture,
  LectureOneLevelDeep,
  LectureTwoLevelsDeep,
} from '../../../types'

// The functions in this file are unfortunately needed, because Strapi's API doesn't filter out
// published sub-relation, but instead returns every relation (published AND drafts)...
// https://github.com/strapi/strapi/issues/12665

type CourseAllLevels =
  | Data<Course>
  | Data<CourseOneLevelDeep>
  | Data<CourseTwoLevelsDeep>
  | Data<CourseThreeLevelsDeep>
type LectureAllLevels =
  | Data<Lecture>
  | Data<LectureOneLevelDeep>
  | Data<LectureTwoLevelsDeep>

const isPublished = (
  entity: CourseAllLevels | LectureAllLevels
): boolean => {
  return entity.attributes.publishedAt !== null
}

export const filterOutOnlyPublishedEntriesOnCourse = (
  course: Data<CourseThreeLevelsDeep>
) => {
  const filteredResult = filterOutOnlyPublishedEntriesOnCoursesThreeLevelsDeep([
    course,
  ])
  return filteredResult[0]
}

const filterOutOnlyPublishedEntriesOnCoursesOneLevelsDeep = (
  courses: Data<CourseOneLevelDeep>[]
): Data<CourseOneLevelDeep>[] => {
  return courses.filter(isPublished).map((course) => {
    if (course.attributes.Lectures?.data) {
      course.attributes.Lectures.data =
        filterOutOnlyPublishedEntriesOnLecturesZeroLevelsDeep(
          course.attributes.Lectures.data
        )
    }
    return course
  })
}

const filterOutOnlyPublishedEntriesOnCoursesThreeLevelsDeep = (
  courses: Data<CourseThreeLevelsDeep>[]
): Data<CourseThreeLevelsDeep>[] => {
  return courses.filter(isPublished).map((course) => {
    if (course.attributes.Lectures?.data) {
      course.attributes.Lectures.data =
        filterOutOnlyPublishedEntriesOnLecturesTwoLevelsDeep(
          course.attributes.Lectures.data
        )
    }
    return course
  })
}

export const filterOutOnlyPublishedEntriesOnLecture = (
  lecture: Data<LectureTwoLevelsDeep>
) => {
  const filteredResult = filterOutOnlyPublishedEntriesOnLecturesTwoLevelsDeep([
    lecture,
  ])
  return filteredResult[0]
}

const filterOutOnlyPublishedEntriesOnLecturesZeroLevelsDeep = (
  lectures: Data<Lecture>[]
) => {
  return lectures.filter(isPublished)
}

const filterOutOnlyPublishedEntriesOnLecturesTwoLevelsDeep = (
  lectures: Data<LectureTwoLevelsDeep>[]
) => {
  return lectures.filter(isPublished).map((lecture) => {
    if (lecture.attributes.Courses?.data) {
      lecture.attributes.Courses.data =
        filterOutOnlyPublishedEntriesOnCoursesOneLevelsDeep(
          lecture.attributes.Courses.data
        )
    }
    return lecture
  })
}
