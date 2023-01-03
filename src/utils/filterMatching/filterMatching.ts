import React from 'react'
import { CourseThreeLevelsDeep, Data } from '../../types'

type MatchesInCourse = {
  [key: string]: Match
}

type Match = {
  lecture: string
  block?: string
}

export const TIMEOUT_THRESHOLD_FOR_MATCH_LOCALIZATION = 3000

export const getMatchingLecturesAndBlocks = (
  course: Data<CourseThreeLevelsDeep>,
  keywords: string[],
  authors: string[]
): Promise<MatchesInCourse> => {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Operation timed out!'))
    }, TIMEOUT_THRESHOLD_FOR_MATCH_LOCALIZATION)
  })

  return Promise.race([
    extractMatchingSubElementsInCourse(course, keywords, authors),
    timeout,
  ])
}

const wait = () => {
  return new Promise((resolve) => setTimeout(() => resolve('Resolved'), 4000))
}

export const matchesInCourseToString = (matchesInCourse: MatchesInCourse) => {
  const matches = Object.entries(matchesInCourse).map(
    ([filterString, value]) => {
      if (value.block) {
        return `${filterString} found in the lecture block ${value.block}, which is a part of the lecture ${value.lecture}`
      }
      return `${filterString} found in the lecture ${value.lecture}`
    }
  )
  return matches.join('\n')
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
const extractMatchingSubElementsInCourse = (
  course: Data<CourseThreeLevelsDeep>,
  keywords: string[],
  authors: string[]
): Promise<MatchesInCourse> => {
  let metadata = {}
  for (const lecture of course.attributes.Lectures.data) {
    for (const author of authors) {
      for (const lectureCreator of lecture.attributes.LectureCreator.data) {
        if (lectureCreator.attributes.Name === author) {
          metadata = {
            ...metadata,
            [author]: {
              lecture: lecture.attributes.Title,
            },
          }
        }
      }
    }
    for (const block of lecture.attributes.Blocks.data) {
      for (const author of authors) {
        for (const blockAuthor of block.attributes.Authors.data) {
          if (blockAuthor.attributes.Name === author) {
            metadata = {
              ...metadata,
              [author]: {
                block: block.attributes.Title,
                lecture: lecture.attributes.Title,
              },
            }
          }
        }
      }
      for (const selectedKeyword of keywords) {
        for (const keyword of block.attributes.Keywords.data) {
          if (keyword.attributes.Keyword === selectedKeyword) {
            metadata = {
              ...metadata,
              [selectedKeyword]: {
                block: block.attributes.Title,
                lecture: lecture.attributes.Title,
              },
            }
          }
        }
      }
    }
  }
  return Promise.resolve(metadata)
}
