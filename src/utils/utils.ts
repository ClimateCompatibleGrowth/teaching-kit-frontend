import { BlockOneLevelDeep, Data, LearningMaterialType } from '../types'

export const typeToText = (type: LearningMaterialType) => {
  switch (type) {
    case 'COURSE':
      return 'Course'
    case 'LECTURE':
      return 'Lecture'
    case 'BLOCK':
      return 'Block'
  }
}

const summarizeDurationsInMinutes = (blocks: Data<BlockOneLevelDeep>[]) => {
  return blocks.reduce(
    (total, block) => (total += block.attributes.DurationInMinutes),
    0
  )
}

const minutesToFormattedHourString = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const hourString = `${hours} hour${hours > 1 ? 's' : ''}`
  const minutesString = `${minutes !== 0 ? `, ${minutes} minutes` : ''}`
  return `${hourString}${minutesString}`
}

export const summarizeDurations = (blocks: Data<BlockOneLevelDeep>[]) => {
  const durationInMinutes = summarizeDurationsInMinutes(blocks)
  if (durationInMinutes < 60) {
    return `${durationInMinutes} minutes`
  }
  return `${minutesToFormattedHourString(durationInMinutes)}`
}

export const isValidUrl = (string: string): boolean => {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const sourceIsFromS3 = (string: string): boolean => {
  if (isValidUrl(string)) {
    const source = new URL(string)
    return source.hostname === process.env.NEXT_PUBLIC_S3_HOST
  }
  return false
}
