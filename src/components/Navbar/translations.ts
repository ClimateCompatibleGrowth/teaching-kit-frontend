import { Translations } from '../../types/translations'

export type NavbarTranslation = {
  logoAltText: string
  home: string
  submitMaterial: string
  teachingMaterial: string
  languagePicker: {
    label: string
    ariaLabel: string
  }
}

export const LOGO_ALT_TEXT = 'Climate Compatible Growth logotype'
export const HOME = 'Home'
export const SUBMIT_MATERIAL = 'Submit material'
export const TEACHING_MATERIAL = 'Teaching material'
export const CHOOSE_LANGUAGE = 'Choose language'
export const LANGUAGE_PICKER_ARIA_LABEL = 'Languages to pick from'

export const translations: Translations<NavbarTranslation> = {
  en: {
    logoAltText: LOGO_ALT_TEXT,
    home: HOME,
    submitMaterial: SUBMIT_MATERIAL,
    teachingMaterial: TEACHING_MATERIAL,
    languagePicker: {
      label: CHOOSE_LANGUAGE,
      ariaLabel: LANGUAGE_PICKER_ARIA_LABEL,
    },
  },
  'es-ES': {
    logoAltText: 'Climate Compatible Growth logotipo',
    home: 'Hogar',
    submitMaterial: 'Enviar material',
    teachingMaterial: 'Material de enseñanza',
    languagePicker: {
      label: 'Elige lengua',
      ariaLabel: 'Idiomas a elegir',
    },
  },
  'fr-FR': {
    logoAltText: 'Logo de Croissance Compatible avec le Climat',
    home: 'Accueil',
    submitMaterial: 'Soumettre',
    teachingMaterial: 'Matériel pédagogique',
    languagePicker: {
      label: 'Choisissez la langue',
      ariaLabel: 'Langues disponibles',
    },
  },
}
