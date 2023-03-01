import { useRouter } from 'next/router'
import {
  Dispatch,
  createContext,
  SetStateAction,
  useState,
  useEffect,
} from 'react'
import { Locale } from '../types'

type LocaleContext = {
  locale: Locale
  isLoading: boolean
  setLocale?: Dispatch<SetStateAction<Locale>>
}

const defaultContextState: LocaleContext = {
  locale: 'en',
  isLoading: true,
}

export const LocaleContext = createContext<LocaleContext>(defaultContextState)

export const LocaleProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const [locale, setLocale] = useState<Locale>(defaultContextState.locale)
  const [isLoading, setIsLoading] = useState<boolean>(
    defaultContextState.isLoading
  )
  const router = useRouter()

  useEffect(() => {
    setLocale(router.locale as Locale)
    setIsLoading(false)
  }, [])

  // Note: This push is slow on 'npm run develop' since the new locale page has to be built.
  // On production build it's more seemless.
  useEffect(() => {
    router.push(router.asPath, router.asPath, { locale })
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isLoading }}>
      {children}
    </LocaleContext.Provider>
  )
}
