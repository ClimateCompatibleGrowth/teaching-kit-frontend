import { getRecentLectures } from '../lectures/lectures'
import { getRecentCourses } from '../courses/courses'
import {
  CourseTwoLevelsDeep,
  Data,
  LearningMaterialType,
  LectureTwoLevelsDeep,
  Locale,
} from '../../../types'
import { formatDate } from '../../../utils/utils'
import { DEFAULT_LOCALE } from '../../../contexts/LocaleContext'

export type RecentUpdateType = {
  Id: number
  Vuid: string
  UpdatedAt: string
  Title?: string
  Abstract?: string
  Type: LearningMaterialType
  Locale: Locale
}

type LearningMaterial =
  | Data<LectureTwoLevelsDeep>
  | Data<CourseTwoLevelsDeep>

const getLearningMaterial = async <T extends LearningMaterial>(
  locale: Locale = DEFAULT_LOCALE,
  getLearningMaterial: () => Promise<T[]>
) => {
  const learningMaterial = await getLearningMaterial()

  if (locale === DEFAULT_LOCALE) {
    return learningMaterial
  }

  const translatedMaterial = learningMaterial.map((material) => {
    // Annoying TS issue: https://github.com/microsoft/TypeScript/issues/33591 forces us to spread the array
    // (which makes matchingLocale an array of a union type, instead of an array of one of either type).
    // This also makes us type cast courses, lectures and blocks in refinedCourses, refinedLectures & refinedBlocks...
    const matchingLocale = [...material.attributes.localizations.data].find(
      (localization) => localization.attributes.locale === locale
    )

    return matchingLocale ?? material
  })

  return translatedMaterial
}

export const getRecentUpdates = async (locale?: Locale) => {
  const [courses, lectures] = await Promise.all([
    getLearningMaterial(locale, getRecentCourses),
    getLearningMaterial(locale, getRecentLectures),
  ])

  const now = new Date()
  const nowStamp = formatDate(now)

  const refinedCourses: RecentUpdateType[] = (
    courses as Data<CourseTwoLevelsDeep>[]
  ).map((course) => ({
    Id: course.id,
    Vuid: course.attributes.vuid,
    UpdatedAt: course.attributes.updatedAt || nowStamp,
    Title: course.attributes.Title,
    Abstract: course.attributes.Abstract,
    Type: 'COURSE',
    Locale: course.attributes.locale,
  }))

  const refinedLectures: RecentUpdateType[] = (
    lectures as Data<LectureTwoLevelsDeep>[]
  ).map((lecture) => ({
    Id: lecture.id,
    Vuid: lecture.attributes.vuid,
    UpdatedAt: lecture.attributes.updatedAt || nowStamp,
    Title: lecture.attributes.Title,
    Abstract: lecture.attributes.Abstract,
    Type: 'LECTURE',
    Locale: lecture.attributes.locale,
  }))


  return [...refinedCourses, ...refinedLectures].sort(
    (a, b) => new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime()
  )
}
