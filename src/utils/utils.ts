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
