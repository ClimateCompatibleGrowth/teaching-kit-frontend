import { Translations } from '../../types/translations'

type FooterTranslation = {
  logoAltText: string
  copyright: string
  vercelAltText: string
  creativeCommonsAltText: string
  footerContent: string
}

export const LOGO_ALT_TEXT = 'Climate Compatible Growth logotype'
export const COPYRIGHT = `Copyright © Climate Compatible Growth ${new Date().getUTCFullYear()}. All rights reserved.`
export const VERCEL_ALT_TEXT = 'Powered on Vercel'
export const CREATIVE_COMMONS_ALT_TEXT = 'Creative commons BY 4.0 license icon'
export const FOOTER_CONTENT =
  '#### Contacts\n\nTo enquire about access to the teaching kit website to develop and share your own material, please e-mail [teaching@climatecompatiblegrowth.com](mailto:teaching@climatecompatiblegrowth.com)\n\nTo provide feedback on the teaching kit website, please e-mail [platform@climatecompatiblegrowth.com](mailto:platform@climatecompatiblegrowth.com)\n\n These teaching materials are based on content provided by Climate Compatible Growth as part of their FCDO-funded activities. As this content can be adapted by other institutions, the opinions expressed here may not reflect those of CCG or its funders.'

export const translations: Translations<FooterTranslation> = {
  en: {
    logoAltText: LOGO_ALT_TEXT,
    copyright: COPYRIGHT,
    vercelAltText: VERCEL_ALT_TEXT,
    creativeCommonsAltText: CREATIVE_COMMONS_ALT_TEXT,
    footerContent: FOOTER_CONTENT,
  },
  'es-ES': {
    logoAltText: 'Climate Compatible Growth logotipo',
    copyright: `Copyright © Climate Compatible Growth ${new Date().getUTCFullYear()}. Reservados todos los derechos.`,
    vercelAltText: 'Encendido Vercel',
    creativeCommonsAltText: 'Creative commons BY 4.0 icono de licencia',
    footerContent:
      '#### Contactos\n\nPara consultar sobre el acceso al sitio web del kit de enseñanza para desarrollar y compartir su propio material, envíe un correo electrónico a [teaching@climatecompatiblegrowth.com](mailto:teaching@climatecompatiblegrowth.com)\n\nPara proporcionar comentarios sobre la enseñanza sitio web del kit, envíe un correo electrónico a [platform@climatecompatiblegrowth.com](mailto:platform@climatecompatiblegrowth.com)\n\n Estos materiales didácticos se basan en el contenido proporcionado por Climate Compatible Growth como parte de sus actividades financiadas por FCDO. Como este contenido puede ser adaptado por otras instituciones, las opiniones expresadas aquí pueden no reflejar las de CCG o sus patrocinadores.',
  },
  'fr-FR': {
    logoAltText: 'Logo de Croissance Compatible avec le Climat',
    copyright: `Copyright © Croissance Compatible avec le Climat ${new Date().getUTCFullYear()}. Tous droits réservés.`,
    vercelAltText: 'Hébergé par Vercel',
    creativeCommonsAltText: 'Creative commons BY 4.0 icono de licencia',
    footerContent:
      '#### Contacts\n\nPour toute demande concernant laccès au site web du kit pédagogique pour développer et partager votre propre matériel, envoyez un e-mail à [teaching@climatecompatiblegrowth.com](mailto:teaching@climatecompatiblegrowth.com)\n\nPour donner votre avis sur le site web du kit pédagogique, envoyez un e-mail à [platform@climatecompatiblegrowth.com](mailto:platform@climatecompatiblegrowth.com)Ces documents pédagogiques sont basés sur le contenu fourni par Climate Compatible Growth dans le cadre de ses activités financées par le FCDO. Comme ce contenu peut être adapté par dautres institutions, les opinions exprimées ici peuvent ne pas refléter celles de CCG ou de ses sponsors.',
  },
}
