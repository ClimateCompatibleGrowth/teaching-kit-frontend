import Link from 'next/link'
import * as Styled from './styles'

import LogoIcon from '../../../public/logo.svg'
import { useRouter } from 'next/router'
import Dropdown from '../Dropdown/Dropdown'
import { LocaleContext } from '../../contexts/LocaleContext'
import { useContext } from 'react'
import { localeToLanguage } from '../../utils/utils'
import { Locale, locales } from '../../types'
import {
  CHOOSE_LANGUAGE,
  HOME,
  LANGUAGE_PICKER_ARIA_LABEL,
  LOGO_ALT_TEXT,
  TEACHING_MATERIAL,
  translations,
} from './translations'

export default function Navbar() {
  const { pathname } = useRouter()
  const { locale, setLocale, isLoading } = useContext(LocaleContext)

  const translation = translations[locale]

  return (
    <Styled.ColorBar>
      <Styled.Wrapper>
        <Styled.LogoWrapper>
          <LogoIcon alt={translation.logoAltText ?? LOGO_ALT_TEXT} />
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
          <Styled.Li>
            <Styled.LanguageSelector>
              {setLocale !== undefined && !isLoading ? (
                <Dropdown
                  id='locale-selector'
                  enableSearch={false}
                  isSingleSelectable
                  selectedItems={[
                    { id: locale, label: localeToLanguage(locale) },
                  ]}
                  setSelectedItems={(item) => setLocale(item[0].id as Locale)}
                  label={translation.languagePicker.label ?? CHOOSE_LANGUAGE}
                  placeholder={localeToLanguage(locale)}
                  ariaLabel={
                    translation.languagePicker.ariaLabel ??
                    LANGUAGE_PICKER_ARIA_LABEL
                  }
                  getItems={() =>
                    Promise.resolve(
                      locales.map((locale) => ({
                        id: locale,
                        label: localeToLanguage(locale),
                      }))
                    )
                  }
                />
              ) : null}
            </Styled.LanguageSelector>
          </Styled.Li>
        </Styled.Ul>
      </Styled.Wrapper>
    </Styled.ColorBar>
  )
}
