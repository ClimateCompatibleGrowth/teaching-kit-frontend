import { getRecentLectures } from '../lectures/lectures'
import { getRecentBlocks } from '../blocks/blocks'
import { getRecentCourses } from '../courses/courses'
import { Block, Data, Level } from '../../../types'
import { summarizeDurations } from '../../../utils/utils'

export type RecentUpdateType = {
  Id: number
  UpdatedAt: string
  Title?: string
  Abstract?: string
  Type: 'Lecture' | 'Course' | 'Block'
  Level?: Level
  Duration?: number | string
}

export const getRecentUpdates = async () => {
  const [courses, lectures, blocks] = await Promise.all([
    getRecentCourses(),
    getRecentLectures(),
    getRecentBlocks(),
  ])
  const now = new Date()
  const nowStamp = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`
  console.log('course', courses)

  const refinedCourses: RecentUpdateType[] = courses.map((a) => ({
    Id: a.id,
    UpdatedAt: a.attributes.updatedAt || nowStamp,
    Title: a.attributes.Title,
    Abstract: a.attributes.Abstract,
    Type: 'Course',
    Level: a.attributes.Level,
    Duration: summarizeDurations(
      a.attributes.Lectures.data.reduce<Data<Block>[]>(
        (lectures, lecture) => [...lectures, ...lecture.attributes.Blocks.data],
        []
      )
    ),
  }))

  const refinedLectures: RecentUpdateType[] = lectures.map((a) => ({
    Id: a.id,
    UpdatedAt: a.attributes.updatedAt || nowStamp,
    Title: a.attributes.Title,
    Abstract: a.attributes.Abstract,
    Type: 'Lecture',
    Level: a.attributes.Level,
    Duration: summarizeDurations(a.attributes.Blocks?.data || []),
  }))

  const refinedBlocks: RecentUpdateType[] = blocks.map((a) => ({
    Id: a.id,
    UpdatedAt: a.attributes.updatedAt || nowStamp,
    Title: a.attributes.Title,
    Abstract: a.attributes.Abstract,
    Type: 'Block',
    Duration: summarizeDurations([a]),
  }))

  return [...refinedBlocks, ...refinedCourses, ...refinedLectures].sort(
    (a, b) => new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime()
  )
  // .slice(0, 5)
}
