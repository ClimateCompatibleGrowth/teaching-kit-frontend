import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Global } from '@emotion/react'
import defaultStyle from '../styles/default'
import { LocaleProvider } from '../contexts/LocaleContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LocaleProvider>
        <Global styles={defaultStyle} />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </LocaleProvider>
    </>
  )
}
