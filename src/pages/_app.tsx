import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar/Navbar'
import { Global } from '@emotion/react'
import defaultStyle from '../styles/default'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={defaultStyle} />
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}
