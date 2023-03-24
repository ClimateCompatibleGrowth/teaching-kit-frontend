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

type LearningMaterial =
  | Data<BlockOneLevelDeep>
  | Data<LectureTwoLevelsDeep>
  | Data<CourseTwoLevelsDeep>

const getLearningMaterial = async <T extends LearningMaterial>(
  locale: Locale = DEFAULT_LOCALE,
  getLearningMaterial: (locale: Locale) => Promise<T[]>
) => {
  const learningMaterial = await getLearningMaterial(locale)
  const defaultLocaleMaterial = await getLearningMaterial(DEFAULT_LOCALE)

  if (locale === DEFAULT_LOCALE) {
    return learningMaterial
  }

  const translatedMaterial = learningMaterial.filter((material) => {
    const targetLocale = locale

    const matchingLocale = material.attributes.locale === targetLocale
    return matchingLocale
  })

  return translatedMaterial.length > 0
    ? translatedMaterial
    : defaultLocaleMaterial
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
