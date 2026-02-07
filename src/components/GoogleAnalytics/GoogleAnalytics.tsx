import { useEffect } from 'react'
import Script from 'next/script'
import { areCookiesAccepted } from '../../utils/cookieConsent'

const GA_MEASUREMENT_ID = 'G-J13MD2JZEM'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

const GoogleAnalytics = () => {
  const shouldLoadGA = areCookiesAccepted()

  useEffect(() => {
    // Listen for consent events
    const handleConsentAccepted = () => {
      // Reload the page to initialize GA4
      window.location.reload()
    }

    window.addEventListener('cookieConsentAccepted', handleConsentAccepted)

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentAccepted)
    }
  }, [])

  if (!shouldLoadGA) {
    return null
  }

  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

export default GoogleAnalytics
