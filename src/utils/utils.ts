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
