import { getRecentLectures } from '../lectures/lectures'
import { getRecentBlocks } from '../blocks/blocks'
import { getRecentCourses } from '../courses/courses'
import {
  Block,
  BlockOneLevelDeep,
  CourseTwoLevelsDeep,
  Data,
  LearningMaterialType,
  LectureTwoLevelsDeep,
  Level,
  Locale,
} from '../../../types'
import { formatDate, summarizeDurations } from '../../../utils/utils'
import { DEFAULT_LOCALE } from '../../../contexts/LocaleContext'

export type RecentUpdateType = {
  Id: number
  Vuid: string
  UpdatedAt: string
  Title?: string
  Abstract?: string
  Type: LearningMaterialType
  Level?: { data?: Data<Level> }
  Duration?: number | string
  Locale: Locale
}

type TranslationOccurances = {
  [vuid: string]: number
}

type LearningMaterial =
  | Data<BlockOneLevelDeep>
  | Data<LectureTwoLevelsDeep>
  | Data<CourseTwoLevelsDeep>

const preferredLocale = <T extends LearningMaterial>(
  locale: Locale,
  translationOccurances: TranslationOccurances,
  learningMaterial: T
): T | undefined => {
  if (translationOccurances[learningMaterial.attributes.vuid] > 1) {
    if (learningMaterial.attributes.locale === locale) {
      return learningMaterial
    }
  } else {
    return learningMaterial
  }
}

const countOccurances = <T extends LearningMaterial>(
  occurances: TranslationOccurances,
  learningMaterial: T
): TranslationOccurances => {
  const vuid = learningMaterial.attributes.vuid
  if (!occurances[vuid]) {
    occurances[vuid] = 1
  } else {
    occurances[vuid] += 1
  }
  return occurances
}

const getLearningMaterial = async <T extends LearningMaterial>(
  locale: Locale = DEFAULT_LOCALE,
  getLearningMaterial: (locale: Locale) => Promise<T[]>
) => {
  const learningMaterialWithDifferentLocales =
    locale !== DEFAULT_LOCALE
      ? (
          await Promise.all([
            getLearningMaterial(locale),
            getLearningMaterial(DEFAULT_LOCALE),
          ])
        ).flat()
      : await getLearningMaterial(locale)
  const translationOccurances = learningMaterialWithDifferentLocales.reduce(
    countOccurances,
    {} as TranslationOccurances
  )
  return learningMaterialWithDifferentLocales.filter(
    (learningMaterial) =>
      preferredLocale(locale, translationOccurances, learningMaterial) &&
      learningMaterial.attributes.vuid !== null
  )
}

export const getRecentUpdates = async (locale?: Locale) => {
  const [courses, lectures, blocks] = await Promise.all([
    getLearningMaterial(locale, getRecentCourses),
    getLearningMaterial(locale, getRecentLectures),
    getLearningMaterial(locale, getRecentBlocks),
  ])

  const now = new Date()
  const nowStamp = formatDate(now)

  const refinedCourses: RecentUpdateType[] = courses.map((course) => ({
    Id: course.id,
    Vuid: course.attributes.vuid,
    UpdatedAt: course.attributes.updatedAt || nowStamp,
    Title: course.attributes.Title,
    Abstract: course.attributes.Abstract,
    Type: 'COURSE',
    Level: course.attributes.Level,
    Duration: summarizeDurations(
      course.attributes.Lectures.data.reduce<Data<Block>[]>(
        (lectures, lecture) => [...lectures, ...lecture.attributes.Blocks.data],
        []
      ),
      locale
    ),
    Locale: course.attributes.locale,
  }))

  const refinedLectures: RecentUpdateType[] = lectures.map((lecture) => ({
    Id: lecture.id,
    Vuid: lecture.attributes.vuid,
    UpdatedAt: lecture.attributes.updatedAt || nowStamp,
    Title: lecture.attributes.Title,
    Abstract: lecture.attributes.Abstract,
    Type: 'LECTURE',
    Level: lecture.attributes.Level,
    Duration: summarizeDurations(lecture.attributes.Blocks?.data || [], locale),
    Locale: lecture.attributes.locale,
  }))

  const refinedBlocks: RecentUpdateType[] = blocks.map((block) => ({
    Id: block.id,
    Vuid: block.attributes.vuid,
    UpdatedAt: block.attributes.updatedAt || nowStamp,
    Title: block.attributes.Title,
    Abstract: block.attributes.Abstract,
    Type: 'BLOCK',
    Duration: summarizeDurations([block], locale),
    Locale: block.attributes.locale,
  }))

  return [...refinedBlocks, ...refinedCourses, ...refinedLectures].sort(
    (a, b) => new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime()
  )
}
