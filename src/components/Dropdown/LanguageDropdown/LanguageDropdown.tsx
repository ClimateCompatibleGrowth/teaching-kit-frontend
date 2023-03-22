import React, { useContext, useState } from 'react'
import * as Styled from './styles'
import Globe from '../../../../public/icons/globe.svg'
import { LocaleContext } from '../../../contexts/LocaleContext'

export default function LanguageDropdown() {
  const { setLocale } = useContext(LocaleContext)
  const [currentLocale, setCurrentLocale] = useState('English')

  const alternativeLocales = ['English', 'Español']

  const updateLocale = (chosenLocale: string) => {
    setCurrentLocale(chosenLocale)
    setLocale?.(chosenLocale === 'English' ? 'en' : 'es-ES')
  }

  const handleOnClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLocale(e.currentTarget.value)
  }

  return (
    <Styled.Wrapper tabIndex={-1}>
      <Styled.GlobeIcon>
        <Globe />
      </Styled.GlobeIcon>
      <Styled.DropdownSelector onChange={(e) => handleOnClick(e)}>
        <option value='' selected disabled hidden>
          {currentLocale}
        </option>
        {alternativeLocales.map((locale) => {
          return <option key={locale}>{locale}</option>
        })}
      </Styled.DropdownSelector>
    </Styled.Wrapper>
  )
}
