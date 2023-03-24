import { DEFAULT_LOCALE } from '../contexts/LocaleContext'
import {
  BlockOneLevelDeep,
  Data,
  LearningMaterialType,
  Level,
  Locale,
} from '../types'
import { Translations } from '../types/translations'
import { Language } from '../types'

export const typeToText = (
  type: LearningMaterialType,
  locale: Locale,
  lowerCase?: boolean
) => {
  switch (type) {
    case 'COURSE':
      if (locale === 'es-ES') {
        return lowerCase ? 'curso' : 'Curso'
      }
      return lowerCase ? 'course' : 'Course'
    case 'LECTURE':
      if (locale === 'es-ES') {
        return lowerCase ? 'conferencia' : 'Conferencia'
      }
      return lowerCase ? 'lecture' : 'Lecture'
    case 'BLOCK':
      if (locale === 'es-ES') {
        return lowerCase ? 'bloque de conferencias' : 'Bloque de conferencias'
      }
      return lowerCase ? 'lecture block' : 'Lecture block'
  }
}

type Time = {
  minutes: string
  hour: string
}

const translations: Translations<Time> = {
  en: {
    minutes: 'minutes',
    hour: 'hour',
  },
  'es-ES': {
    minutes: 'minutos',
    hour: 'hora',
  },
  'fr-FR': {
    minutes: 'minutes',
    hour: 'heure',
  },
}

const summarizeDurationsInMinutes = (
  blocks: Data<Pick<BlockOneLevelDeep, 'DurationInMinutes'>>[]
) => {
  return blocks.reduce(
    (total, block) => (total += block.attributes.DurationInMinutes),
    0
  )
}

const minutesToFormattedHourString = (
  totalMinutes: number,
  locale: Locale = DEFAULT_LOCALE
) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const hourString = `${hours} ${translations[locale].hour}${
    hours > 1 ? 's' : ''
  }`
  const minutesString = `${
    minutes !== 0 ? `, ${minutes} ${translations[locale].minutes}` : ''
  }`
  return `${hourString}${minutesString}`
}

export const summarizeDurations = (
  blocks: Data<Pick<BlockOneLevelDeep, 'DurationInMinutes'>>[],
  locale: Locale = DEFAULT_LOCALE
) => {
  const durationInMinutes = summarizeDurationsInMinutes(blocks)
  if (durationInMinutes < 60) {
    return `${durationInMinutes} ${translations[locale].minutes}`
  }
  return `${minutesToFormattedHourString(durationInMinutes, locale)}`
}

export const formatDate = (date: Date | string): string => {
  let dateObj
  if (typeof date === 'string') {
    dateObj = new Date(date)
  } else {
    dateObj = date
  }
  return dateObj.toLocaleDateString('sv-SE')
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

export const typeToDownloadLabel = (type: LearningMaterialType): string => {
  switch (type) {
    case 'COURSE':
      return 'Download course content'
    case 'LECTURE':
      return 'Download lecture content'
    case 'BLOCK':
      return 'Download lecture block'
    default:
      return 'Download'
  }
}

export const stripBackslashN = (string: string) => {
  return string.replace(/\n/g, '')
}

export const getImageMetadata = async (url: string) => {
  const img = new Image()
  img.crossOrigin = 'anonymous' //https://stackoverflow.com/a/47359958/5837635
  img.src = url
  await img.decode()
  return img
}

export const localeToLanguage = (locale: Locale): Language => {
  switch (locale) {
    case 'en':
      return 'English'
    case 'es-ES':
      return 'Español'
    case 'fr-FR':
      return 'Français'
  }
}

export const languageToLocale = (language: Language): Locale => {
  switch (language) {
    case 'English':
      return 'en'
    case 'Español':
      return 'es-ES'
    case 'Français':
      return 'fr-FR'
  }
}
