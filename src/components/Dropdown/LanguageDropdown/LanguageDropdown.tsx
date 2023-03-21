import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  createRef,
} from 'react'
import * as Styled from './styles'
import Globe from '../../../../public/icons/globe.svg'
import DropdownArrow from '../../../../public/icons/dropdown-arrow.svg'
import { LocaleContext } from '../../../contexts/LocaleContext'

export default function LanguageDropdown() {
  const { setLocale } = useContext(LocaleContext)
  const [currentLocale, setCurrentLocale] = useState('English')
  const [isOpen, setIsOpen] = useState(false)
  const alternativeLocales = ['English', 'Español']
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const listContainerRef = useRef<HTMLDivElement>(null)

  const showDropdown = (option: boolean) => {
    setIsOpen(option)
  }

  const updateLocale = (chosenLocale: string) => {
    setCurrentLocale(chosenLocale)
    setLocale?.(chosenLocale === 'English' ? 'en' : 'es-ES')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      showDropdown(!isOpen)
      //   setSuggestionIndex(-1)
      console.log(listContainerRef.current, 'listContainerRef?.current')
    }
    if (e.key === 'Escape') {
      showDropdown(!isOpen)
    }
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      e.preventDefault()
      console.log(e)

      if (suggestionIndex === 0) {
        setSuggestionIndex(-1)
        return
      }
    }
  }

  useEffect(() => {
    console.log(listContainerRef)
  }, [isOpen])

  return (
    <Styled.Wrapper
      tabIndex={suggestionIndex}
      onClick={() => showDropdown(!isOpen)}
      onKeyDown={(e) => handleKeyPress(e)}
    >
      <Styled.GlobeIcon>
        <Globe />
      </Styled.GlobeIcon>
      <Styled.DropdownWrapper>{currentLocale}</Styled.DropdownWrapper>
      <Styled.DropdownArrow>
        <DropdownArrow />
      </Styled.DropdownArrow>
      {isOpen && (
        <Styled.DropdownListContainer
          className='dropdown-list-container'
          ref={listContainerRef}
          tabIndex={suggestionIndex}
          isOpen={isOpen}
        >
          {alternativeLocales.map((locale, i) => {
            return (
              <Styled.DropdownListItem
                tabIndex={0}
                key={locale}
                onClick={() => updateLocale(locale)}
                onKeyUp={(e) => handleKeyPress(e)}
              >
                <div tabIndex={i}>{locale}</div>
              </Styled.DropdownListItem>
            )
          })}
        </Styled.DropdownListContainer>
      )}
    </Styled.Wrapper>
  )
}
