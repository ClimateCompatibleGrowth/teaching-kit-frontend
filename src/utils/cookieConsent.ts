/**
 * Check if the user has given cookie consent
 * @returns 'accepted' | 'declined' | null (null if no choice has been made)
 */
export const getCookieConsent = (): 'accepted' | 'declined' | null => {
  if (typeof window === 'undefined') {
    return null
  }
  const consent = localStorage.getItem('cookie-consent')
  return consent as 'accepted' | 'declined' | null
}

/**
 * Check if cookies are accepted
 * @returns boolean
 */
export const areCookiesAccepted = (): boolean => {
  return getCookieConsent() === 'accepted'
}

/**
 * Reset cookie consent (useful for testing)
 */
export const resetCookieConsent = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cookie-consent')
  }
}
