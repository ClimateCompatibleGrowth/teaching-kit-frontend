import Link from 'next/link'
import * as Styled from './styles'

import LogoIcon from '../../../public/logo.svg'
import { useRouter } from 'next/router'
import Dropdown from '../Dropdown/Dropdown'
import { LocaleContext } from '../../contexts/LocaleContext'
import { useContext } from 'react'
import { localeToLanguage } from '../../utils/utils'
import { Locale, locales } from '../../types'

export default function Navbar() {
  const { pathname } = useRouter()
  const { locale, setLocale, isLoading } = useContext(LocaleContext)

  return (
    <Styled.ColorBar>
      <Styled.Wrapper>
        <Styled.LogoWrapper>
          <LogoIcon alt='Climate Compatible Growth logotype' />
        </Styled.LogoWrapper>
        <Styled.Ul>
          <Styled.Li>
            <Link aria-current={pathname === '/' ? 'page' : undefined} href='/'>
              Home
            </Link>
          </Styled.Li>
          <Styled.Li>
            <Link
              aria-current={
                pathname === '/teaching-material' ? 'page' : undefined
              }
              href='/teaching-material'
            >
              Teaching Material
            </Link>
          </Styled.Li>
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
                label='Choose language'
                placeholder={localeToLanguage(locale)}
                ariaLabel='Languages to pick from'
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
        </Styled.Ul>
      </Styled.Wrapper>
    </Styled.ColorBar>
  )
}
