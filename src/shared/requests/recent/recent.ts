import { getRecentLectures } from '../lectures/lectures'
import { getRecentBlocks } from '../blocks/blocks'
import { getRecentCourses } from '../courses/courses'
import { Block, Data, LearningMaterialType, Level } from '../../../types'
import { formatDate, summarizeDurations } from '../../../utils/utils'

export type RecentUpdateType = {
  Id: number
  UpdatedAt: string
  Title?: string
  Abstract?: string
  Type: LearningMaterialType
  Level?: { data?: Data<Level> }
  Duration?: number | string
}

export const getRecentUpdates = async () => {
  const [courses, lectures, blocks] = await Promise.all([
    getRecentCourses(),
    getRecentLectures(),
    getRecentBlocks(),
  ])
  const now = new Date()
  const nowStamp = formatDate(now)

  const refinedCourses: RecentUpdateType[] = courses.map((course) => ({
    Id: course.id,
    UpdatedAt: course.attributes.updatedAt || nowStamp,
    Title: course.attributes.Title,
    Abstract: course.attributes.Abstract,
    Type: 'COURSE',
    Level: course.attributes.Level,
    Duration: summarizeDurations(
      course.attributes.Lectures.data.reduce<Data<Block>[]>(
        (lectures, lecture) => [...lectures, ...lecture.attributes.Blocks.data],
        []
      )
    ),
  }))

  const refinedLectures: RecentUpdateType[] = lectures.map((lecture) => ({
    Id: lecture.id,
    UpdatedAt: lecture.attributes.updatedAt || nowStamp,
    Title: lecture.attributes.Title,
    Abstract: lecture.attributes.Abstract,
    Type: 'LECTURE',
    Level: lecture.attributes.Level,
    Duration: summarizeDurations(lecture.attributes.Blocks?.data || []),
  }))

  const refinedBlocks: RecentUpdateType[] = blocks.map((block) => ({
    Id: block.id,
    UpdatedAt: block.attributes.updatedAt || nowStamp,
    Title: block.attributes.Title,
    Abstract: block.attributes.Abstract,
    Type: 'BLOCK',
    Duration: summarizeDurations([block]),
  }))

  return [...refinedBlocks, ...refinedCourses, ...refinedLectures].sort(
    (a, b) => new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime()
  )
}
