import Link from 'next/link'
import * as Styled from './styles'

import LogoIcon from '../../../public/logo.svg'
import { useRouter } from 'next/router'
import { LocaleContext } from '../../contexts/LocaleContext'
import { useContext } from 'react'

import {
  HOME,
  LOGO_ALT_TEXT,
  SUBMIT_MATERIAL,
  TEACHING_MATERIAL,
  translations,
} from './translations'
import LanguageDropdown from '../Dropdown/LanguageDropdown/LanguageDropdown'

export default function Navbar() {
  const { pathname } = useRouter()
  const { locale, setLocale, isLoading } = useContext(LocaleContext)

  const translation = translations[locale]

  return (
    <Styled.ColorBar>
      <Styled.Wrapper>
        <Styled.LogoWrapper>
          <Link href='/'>
            <LogoIcon alt={translation.logoAltText ?? LOGO_ALT_TEXT} />
          </Link>
        </Styled.LogoWrapper>
        <Styled.Ul>
          <Styled.Li>
            <Link aria-current={pathname === '/' ? 'page' : undefined} href='/'>
              {translation.home ?? HOME}
            </Link>
          </Styled.Li>
          <Styled.Li>
            <Link
              aria-current={
                pathname === '/teaching-material' ? 'page' : undefined
              }
              href='/teaching-material'
            >
              {translation.teachingMaterial ?? TEACHING_MATERIAL}
            </Link>
          </Styled.Li>
          {/* {process.env.NEXT_PUBLIC_ACCEPT_FORM_SUBMISSIONS === 'true' && <Styled.Li>
            <Link
              aria-current={
                pathname === '/submit-material' ? 'page' : undefined
              }
              href='/submit-material'
            >
              {translation.submitMaterial ?? SUBMIT_MATERIAL}
            </Link>
          </Styled.Li>} */}
          <Styled.Li>
            <Styled.LanguageSelector>
              {setLocale !== undefined && !isLoading ? (
                <LanguageDropdown />
              ) : null}
            </Styled.LanguageSelector>
          </Styled.Li>
        </Styled.Ul>
      </Styled.Wrapper>
    </Styled.ColorBar>
  )
}
