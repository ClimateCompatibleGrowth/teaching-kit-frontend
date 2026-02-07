import React, { useEffect, useState, useContext } from 'react'
import { LocaleContext } from '../../contexts/LocaleContext'
import * as Styled from './styles'
import { translations } from './translations'

const COOKIE_CONSENT_KEY = 'cookie-consent'

type ConsentValue = 'accepted' | 'declined' | null

const CookieConsent = () => {
  const { locale } = useContext(LocaleContext)
  const [consent, setConsent] = useState<ConsentValue>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (storedConsent) {
      setConsent(storedConsent as ConsentValue)
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setConsent('accepted')
    setIsVisible(false)
    // Here you can trigger GA4 initialization
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentAccepted'))
    }
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
    setConsent('declined')
    setIsVisible(false)
    // Here you can ensure GA4 is not initialized
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentDeclined'))
    }
  }

  if (!isVisible) {
    return null
  }

  const t = translations[locale] || translations.en

  return (
    <Styled.Overlay>
      <Styled.Banner>
        <Styled.Content>
          <Styled.Title>{t.title}</Styled.Title>
          <Styled.Description>{t.description}</Styled.Description>
        </Styled.Content>
        <Styled.ButtonGroup>
          <Styled.AcceptButton onClick={handleAccept}>
            {t.accept}
          </Styled.AcceptButton>
          <Styled.DeclineButton onClick={handleDecline}>
            {t.decline}
          </Styled.DeclineButton>
        </Styled.ButtonGroup>
      </Styled.Banner>
    </Styled.Overlay>
  )
}

export default CookieConsent
