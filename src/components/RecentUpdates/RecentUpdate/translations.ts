import { Translations } from '../../../types/translations'

type RecentUpdateTranslation = {
  durationAriaLabel: string
  levelAriaLabel: string
}

export const DURATION_ARIA_LABEL = 'Duration is'
export const LEVEL_ARIA_LABEL = 'Level is'

export const translations: Translations<RecentUpdateTranslation> = {
  en: {
    durationAriaLabel: DURATION_ARIA_LABEL,
    levelAriaLabel: LEVEL_ARIA_LABEL,
  },
  'es-ES': {
    durationAriaLabel: 'La duración es',
    levelAriaLabel: 'El nivel es',
  },
}
