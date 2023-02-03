import { BlockOneLevelDeep, Data, LearningMaterialType, Level } from '../types'

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

const summarizeDurationsInMinutes = (
  blocks: Data<Pick<BlockOneLevelDeep, 'DurationInMinutes'>>[]
) => {
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

export const summarizeDurations = (
  blocks: Data<Pick<BlockOneLevelDeep, 'DurationInMinutes'>>[]
) => {
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

export const levelToString = (level: {
  data?: Data<Level>
}): string | undefined => {
  if (!level.data) {
    return undefined
  }
  const withoutNumerationPrefix = level.data.attributes.Level.replace(
    /[0-9]./g,
    ''
  )
  return withoutNumerationPrefix
}

export const stripBackslashN = (string: string) => {
  return string.replace(/\n/g, '')
}

export const getImageMetadata = async (url: string) => {
  const img = new Image()
  img.src = url
  await img.decode()
  return img
}
