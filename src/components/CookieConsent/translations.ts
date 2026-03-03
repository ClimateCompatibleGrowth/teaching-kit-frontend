import { Locale } from '../../types'

type CookieConsentTranslations = {
  title: string
  description: string
  accept: string
  decline: string
}

export const translations: Record<Locale, CookieConsentTranslations> = {
  en: {
    title: 'Cookie Consent',
    description:
      'We use cookies and similar technologies to make this site work and to improve it.Analytics helps us understand which pages are visited and how often content is downloaded so we can improve site content and navigation.',
    accept: 'Accept Analytics',
    decline: 'Reject Analytics',
  },
  'es-ES': {
    title: 'Consentimiento de cookies',
    description:
      'Utilizamos cookies y tecnologías similares para que este sitio funcione correctamente y para mejorarlo. La analítica nos ayuda a comprender qué páginas se visitan y con qué frecuencia se descarga el contenido, para poder mejorar el contenido y la navegación del sitio.',
    accept: 'Aceptar analítica',
    decline: 'Rechazar analítica',
  },
  'fr-FR': {
    title: 'Consentement aux cookies',
    description:
      'Nous utilisons des cookies et des technologies similaires pour faire fonctionner ce site et l’améliorer. Les outils d’analyse nous aident à comprendre quelles pages sont consultées et à quelle fréquence le contenu est téléchargé, afin d’améliorer le contenu et la navigation du site.',
    accept: 'Accepter l’analytique',
    decline: 'Refuser l’analytique',
  },
}
