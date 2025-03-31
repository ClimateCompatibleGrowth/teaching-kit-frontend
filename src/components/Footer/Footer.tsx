import * as Styled from './styles'

import LogoIcon from '../../../public/logo.svg'
import VercelBanner from '../../../public/vercel-banner.svg'
import Markdown from '../Markdown/Markdown'

import Image from 'next/image'
import { useContext } from 'react'
import { LocaleContext } from '../../contexts/LocaleContext'
import {
  COPYRIGHT,
  CREATIVE_COMMONS_ALT_TEXT,
  FOOTER_CONTENT,
  LOGO_ALT_TEXT,
  translations,
  VERCEL_ALT_TEXT,
} from './translations'

export default function Footer() {
  const { locale } = useContext(LocaleContext)
  const translation = translations[locale]

  return (
    <Styled.ColorBar>
      <Styled.Footer>
        <Styled.LogoWrapper>
          <Styled.LogoInnerWrapper>
            <LogoIcon alt={translation.logoAltText ?? LOGO_ALT_TEXT} />
            <p>{translation.copyright ?? COPYRIGHT}</p>
            <Styled.VercelBanner>
              <VercelBanner
                alt={translation.vercelAltText ?? VERCEL_ALT_TEXT}
                width='67'
                height='22'
              />
            </Styled.VercelBanner>
          </Styled.LogoInnerWrapper>
        </Styled.LogoWrapper>
        <Styled.ContactWrapper>
          <Markdown>{translation.footerContent ?? FOOTER_CONTENT}</Markdown>
          <br />
          <a href={'https://creativecommons.org/licenses/by/4.0/'}>
            <Image
              width={88}
              height={31}
              alt={
                translation.creativeCommonsAltText ?? CREATIVE_COMMONS_ALT_TEXT
              }
              src='https://licensebuttons.net/l/by/4.0/88x31.png'
            ></Image>
          </a>
        </Styled.ContactWrapper>
      </Styled.Footer>
    </Styled.ColorBar>
  )
}
