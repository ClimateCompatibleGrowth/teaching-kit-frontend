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
      'We use cookies to collect visitor statistics with Google Analytics (GA4). This helps us improve the website and understand how it is used. You can choose to accept or decline cookies.',
    accept: 'Accept',
    decline: 'Decline',
  },
  'es-ES': {
    title: 'Consentimiento de cookies',
    description:
      'Utilizamos cookies para recopilar estadísticas de visitantes con Google Analytics (GA4). Esto nos ayuda a mejorar el sitio web y comprender cómo se utiliza. Puede elegir aceptar o rechazar las cookies.',
    accept: 'Aceptar',
    decline: 'Rechazar',
  },
  'fr-FR': {
    title: 'Consentement aux cookies',
    description:
      "Nous utilisons des cookies pour collecter des statistiques de visiteurs avec Google Analytics (GA4). Cela nous aide à améliorer le site Web et à comprendre comment il est utilisé. Vous pouvez choisir d'accepter ou de refuser les cookies.",
    accept: 'Accepter',
    decline: 'Refuser',
  },
}
