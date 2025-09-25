import { Translations } from '../../types/translations'

type FooterTranslation = {
  logoAltText: string
  copyright: string
  creativeCommonsAltText: string
  footerContent: string
}

export const LOGO_ALT_TEXT = 'Climate Compatible Growth logotype'
export const COPYRIGHT = `Copyright © Climate Compatible Growth ${new Date().getUTCFullYear()}. All rights reserved.`

export const CREATIVE_COMMONS_ALT_TEXT = 'Creative commons BY 4.0 license icon'
export const FOOTER_CONTENT =
  ' If you would like to learn more about how CCG may support your university, please visit the [page](https://climatecompatiblegrowth.com/international-partnerships/capacity-building/flat-pack/) or contact [Fynn Kiley](mailto:F.Kiley1@lboro.ac.uk).\n\n If you would like to provide feedback to the webpage or the teaching material, please contact [Fynn Kiley](mailto:F.Kiley1@lboro.ac.uk).\n\n These teaching materials are based on content provided by Climate Compatible Growth as part of their FCDO-funded activities. As this content can be adapted by other institutions, the opinions expressed here may not reflect those of CCG or its funders. \n\n The RE-INTEGRATE project has received funding from the European Union´s Horizon Europe Research and Innovation Programme under grant agreement No 101118217'

export const translations: Translations<FooterTranslation> = {
  en: {
    logoAltText: LOGO_ALT_TEXT,
    copyright: COPYRIGHT,
    creativeCommonsAltText: CREATIVE_COMMONS_ALT_TEXT,
    footerContent: FOOTER_CONTENT,
  },
  'es-ES': {
    logoAltText: 'Climate Compatible Growth logotipo',
    copyright: `Copyright © Climate Compatible Growth ${new Date().getUTCFullYear()}. Reservados todos los derechos.`,
    creativeCommonsAltText: 'Creative commons BY 4.0 icono de licencia',
    footerContent:
      '#### Contactos\n\nPara consultar sobre el acceso al sitio web del kit de enseñanza para desarrollar y compartir su propio material, visite la [página](https://climatecompatiblegrowth.com/international-partnerships/capacity-building/flat-pack/) o contacte a [Fynn Kiley](mailto:F.Kiley1@lboro.ac.uk).\n\nSi desea proporcionar comentarios sobre la página web o el material de enseñanza, por favor contacte a [Fynn Kiley](mailto:F.Kiley1@lboro.ac.uk).\n\n Estos materiales didácticos se basan en el contenido proporcionado por Climate Compatible Growth como parte de sus actividades financiadas por FCDO. Como este contenido puede ser adaptado por otras instituciones, las opiniones expresadas aquí pueden no reflejar las de CCG o sus patrocinadores. \n\n El proyecto RE-INTEGRATE ha recibido financiación del Programa de Investigación y Desarrollo de la Unión Europea (Horizon Europe) dentro del convenio de investigación No. 101118217',
  },
  'fr-FR': {
    logoAltText: 'Logo de Croissance Compatible avec le Climat',
    copyright: `Copyright © Croissance Compatible avec le Climat ${new Date().getUTCFullYear()}. Tous droits réservés.`,
    creativeCommonsAltText: 'Creative commons BY 4.0 icono de licencia',
    footerContent:
      '#### Contacts\n\nPour toute demande concernant laccès au site web du kit pédagogique pour développer et partager votre propre matériel, visitez la [page](https://climatecompatiblegrowth.com/international-partnerships/capacity-building/flat-pack/) ou contactez [Fynn Kiley](mailto:F.Kiley1@lboro.ac.uk).\n\nSi vous souhaitez fournir des commentaires sur la page web ou le matériel pédagogique, veuillez contacter [Fynn Kiley](mailto:F.Kiley1@lboro.ac.uk).\n\nCes documents pédagogiques sont basés sur le contenu fourni par Climate Compatible Growth dans le cadre de ses activités financées par le FCDO. Comme ce contenu peut être adapté par dautres institutions, les opinions exprimées ici peuvent ne pas refléter celles de CCG ou de ses sponsors. \n\n Le projet RE-INTEGRATE a reçu un financement du Programme de Recherche et de Développement de lUnion européenne (Horizon Europe) dans le cadre du contrat de recherche No. 101118217',
  },
}
