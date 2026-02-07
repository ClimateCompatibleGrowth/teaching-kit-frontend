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
  sv: {
    title: 'Cookiesamtycke',
    description:
      'Vi använder cookies för att samla in besöksstatistik med Google Analytics (GA4). Detta hjälper oss att förbättra webbplatsen och förstå hur den används. Du kan välja att tillåta eller avböja cookies.',
    accept: 'Tillåt',
    decline: 'Avböj',
  },
}
