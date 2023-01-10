import { CourseThreeLevelsDeep, Data, LectureTwoLevelsDeep } from '../../types'

export type Matches = {
  [key: string]: Match
}

export type Match = {
  lecture: Location
  block?: Location
}

type Location = {
  title: string
  href: string
}

export const TIMEOUT_THRESHOLD_FOR_MATCH_LOCALIZATION = 3000

const startOperationTimeout = () => {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Operation timed out!'))
    }, TIMEOUT_THRESHOLD_FOR_MATCH_LOCALIZATION)
  })
}

export const getMatchingLecturesAndBlocksMatchingLecture = (
  lecture: Data<LectureTwoLevelsDeep>,
  keywords: string[],
  authors: string[]
): Promise<Matches> => {
  return Promise.race([
    extractMatchingSubElementsInLecture(lecture, keywords, authors),
    startOperationTimeout(),
  ])
}

export const getMatchingLecturesAndBlocksMatchingCourse = (
  course: Data<CourseThreeLevelsDeep>,
  keywords: string[],
  authors: string[]
): Promise<Matches> => {
  return Promise.race([
    extractMatchingSubElementsInCourse(course, keywords, authors),
    startOperationTimeout(),
  ])
}

const wait = (): Promise<Matches> => {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ test: { lecture: { title: 'Resolved', href: '/' } } }),
      4000
    )
  )
}

// This can obviously get very time consuming. We would like it more to have this built into
// Strapi, but unfortunately it is not possible. It might be possible to optimize this function
// in the future though.
//
// At maximum, it will iterate through 10 (max page size) * 20 (max lectures) * 4 (max blocks) = 800 blocks,
// but a whole lot more iterations for authors + keywords on different levels.
//
// The keyword iterations will be <amount of selected keywords> * <avg amount of keywords on each block> * 800,
// maybe 5 * 5 * 800 = 20 000 at most.
//
// The author iterations will be:
// <amount of selected authors> (AoSA) * <avg amount of authors on each (AAoAoE) block>) * 800
// + AoSA * <AAoAoE lecture> * 200 + AoSA * <AAoAoE course> * 10,
// maybe 5 * 5 * 800 + 5 * 5 * 200 + 5 * 5 * 10 = 20 000 + 5000 + 250 = 25 250
//
// This should be fine, but should also be taken into consideration when discussing increasing the page size,
// amount of authors on either level, or similar.
//
// The function should be timed, tested and time limited (abort the operation if it takes too much time).
const extractMatchingSubElementsInCourse = async (
  course: Data<CourseThreeLevelsDeep>,
  keywords: string[],
  authors: string[]
): Promise<Matches> => {
  let matches: Matches = {}
  for (const lecture of course.attributes.Lectures.data) {
    for (const author of authors) {
      for (const lectureCreator of lecture.attributes.LectureCreator.data) {
        if (lectureCreator.attributes.Name === author) {
          matches = {
            ...matches,
            [author]: {
              lecture: {
                title: lecture.attributes.Title,
                href: `/lectures/${lecture.id}`,
              },
            },
          }
        }
      }
    }
    const lectureMatches = await extractMatchingSubElementsInLecture(
      lecture,
      keywords,
      authors
    )
    matches = {
      ...matches,
      ...lectureMatches,
    }
  }
  return Promise.resolve(matches)
}

export const extractMatchingSubElementsInLecture = (
  lecture: Data<LectureTwoLevelsDeep>,
  keywords: string[],
  authors: string[]
): Promise<Matches> => {
  let matches: Matches = {}
  for (const block of lecture.attributes.Blocks.data) {
    for (const author of authors) {
      for (const blockAuthor of block.attributes.Authors.data) {
        if (blockAuthor.attributes.Name === author) {
          matches = {
            ...matches,
            [author]: {
              block: {
                title: block.attributes.Title,
                href: `/blocks/${block.id}`,
              },
              lecture: {
                title: lecture.attributes.Title,
                href: `/lectures/${lecture.id}`,
              },
            },
          }
        }
      }
    }
    for (const selectedKeyword of keywords) {
      for (const keyword of block.attributes.Keywords.data) {
        if (keyword.attributes.Keyword === selectedKeyword) {
          matches = {
            ...matches,
            [selectedKeyword]: {
              block: {
                title: block.attributes.Title,
                href: `/blocks/${block.id}`,
              },
              lecture: {
                title: lecture.attributes.Title,
                href: `/lectures/${lecture.id}`,
              },
            },
          }
        }
      }
    }
  }
  return Promise.resolve(matches)
}
