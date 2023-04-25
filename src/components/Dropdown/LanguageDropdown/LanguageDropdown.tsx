import React, { useContext, useState } from 'react'
import * as Styled from './styles'
import Globe from '../../../../public/icons/globe.svg'
import { LocaleContext } from '../../../contexts/LocaleContext'
import { Language, locales } from '../../../types/index'
import { localeToLanguage, languageToLocale } from '../../../utils/utils'
import Cookies from 'js-cookie'

export default function LanguageDropdown() {
  const { setLocale, locale } = useContext(LocaleContext)

  const handleOnClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    return (
      setLocale
        ? setLocale(languageToLocale(e.currentTarget.value as Language))
        : null,
      Cookies.set(
        'Langugae',
        languageToLocale(e.currentTarget.value as Language)
      )
    )
  }

  return (
    <Styled.Wrapper tabIndex={-1}>
      <Styled.GlobeIcon>
        <Globe />
      </Styled.GlobeIcon>
      <Styled.DropdownSelector onChange={(e) => handleOnClick(e)}>
        <option value='' selected disabled hidden>
          {localeToLanguage(locale)}
        </option>
        {locales.map((locale) => {
          return <option key={locale}>{localeToLanguage(locale)}</option>
        })}
      </Styled.DropdownSelector>
    </Styled.Wrapper>
  )
}
