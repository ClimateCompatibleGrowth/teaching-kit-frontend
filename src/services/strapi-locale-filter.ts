import { DEFAULT_LOCALE } from '../contexts/LocaleContext'
import { filterCourseOnKeywordsAndAuthors } from '../shared/requests/courses/courses'
import { filterLectureOnKeywordsAndAuthors } from '../shared/requests/lectures/lectures'
import { ResponseArrayData } from '../shared/requests/types'
import { FilterParameters } from '../shared/requests/utils/utils'
import {
  Block,
  CourseThreeLevelsDeep,
  LectureOneLevelDeep,
} from '../types'
import { SortOptionType } from '../types/filters'

export const getFilteredLectures = async (
  args: FilterParameters<SortOptionType>
): Promise<ResponseArrayData<LectureOneLevelDeep>> => {
  const lectures = await filterLectureOnKeywordsAndAuthors(args)

  if (args.locale === DEFAULT_LOCALE) {
    return lectures
  }

  const translatedLectures = lectures.data.map((lecture) => {
    const matchingLocale = lecture.attributes.localizations.data.find(
      (localization) => localization.attributes.locale === args.locale
    )

    return matchingLocale ?? lecture
  })

  return {
    ...lectures,
    data: translatedLectures,
  }
}

export const getFilteredCourses = async (
  args: FilterParameters<SortOptionType>
): Promise<ResponseArrayData<CourseThreeLevelsDeep>> => {
  const courses = await filterCourseOnKeywordsAndAuthors(args)

  if (args.locale === DEFAULT_LOCALE) {
    return courses
  }

  const translatedCourses = courses.data.map((course) => {
    const matchingLocale = course.attributes.localizations.data.find(
      (localization) => localization.attributes.locale === args.locale
    )

    return matchingLocale ?? course
  })

  return {
    ...courses,
    data: translatedCourses,
  }
}
