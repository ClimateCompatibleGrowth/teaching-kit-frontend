import useSWR from 'swr'
import { getRecentUpdates } from '../shared/requests/recent/recent'
import { Locale } from '../types'

export const useRecentUpdates = (locale?: Locale) => {
  const { data, error, isLoading } = useSWR(
    [`/api/recent-updates`, locale],
    () => getRecentUpdates(locale)
  )

  if (error) {
    console.error(error)
  }

  return {
    recentUpdates: data,
    isLoadingRecentUpdates: isLoading,
    isRecentUpdatesError: error,
  }
}
