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

export const DEFAULT_LOCALE = 'en'

const defaultContextState: LocaleContext = {
  locale: DEFAULT_LOCALE,
  isLoading: true,
}

export const LocaleContext = createContext<LocaleContext>(defaultContextState)

export const LocaleProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>(router.locale as Locale)
  const [isLoading, setIsLoading] = useState<boolean>(
    defaultContextState.isLoading
  )

  useEffect(() => {
    setLocale(router.locale as Locale)
    setIsLoading(false)
  }, [router.locale])

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
