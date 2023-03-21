import { Translations } from '../../types/translations'

type SortTranslation = {
  label: string
  ariaLabel: string
  aToZ: string
  zToA: string
  beginnerToExpert: string
  expertToBeginner: string
}

export const LABEL = 'Sort'
export const ARIA_LABEL = 'Sort options to pick from'
export const A_TO_Z = 'A to Z'
export const Z_TO_A = 'Z to A'
export const BEGINNER_TO_EXPERT = 'Beginner to Expert'
export const EXPERT_TO_BEGINNER = 'Expert to Beginner'

export const SPANISH_A_TO_Z = 'De la A a la Z'
export const SPANISH_Z_TO_A = 'De la Z a la A'

export const translations: Translations<SortTranslation> = {
  en: {
    label: LABEL,
    ariaLabel: ARIA_LABEL,
    aToZ: A_TO_Z,
    zToA: Z_TO_A,
    beginnerToExpert: BEGINNER_TO_EXPERT,
    expertToBeginner: EXPERT_TO_BEGINNER,
  },
  'es-ES': {
    label: 'Clasificar',
    ariaLabel: 'Ordenar opciones para elegir',
    aToZ: SPANISH_A_TO_Z,
    zToA: SPANISH_Z_TO_A,
    beginnerToExpert: 'Principiante a experto',
    expertToBeginner: 'Experto a principiante',
  },
}
