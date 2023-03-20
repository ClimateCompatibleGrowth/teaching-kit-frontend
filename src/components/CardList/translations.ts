import { Translations } from '../../types/translations'

type CardList = {
  noResults: string
}

export const NO_RESULTS = 'No results for the current filter.'

export const translations: Translations<CardList> = {
  en: {
    noResults: NO_RESULTS,
  },
  'es-ES': {
    noResults: 'No hay resultados para el filtro actual.',
  },
}
