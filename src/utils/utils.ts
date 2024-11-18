import {
  LearningMaterialType,
  Locale,
} from '../types'
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
      } else if (locale === 'fr-FR') {
        return lowerCase ? 'cours' : 'Cours'
      }
      return lowerCase ? 'course' : 'Course'
    case 'LECTURE':
      if (locale === 'es-ES') {
        return lowerCase ? 'conferencia' : 'Conferencia'
      } else if (locale === 'fr-FR') {
        return lowerCase ? 'conférence' : 'Conférence'
      }
      return lowerCase ? 'lecture' : 'Lecture'
  }
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

export const isNotNull = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined
}

export const countOccurancesInArray = <T>(string: T, array: T[]) =>
  array.reduce((amountOfOccuraces, current) => {
    return (amountOfOccuraces += current === string ? 1 : 0)
  }, 0)
