import useSWR from 'swr'
import { getRecentUpdates } from '../shared/requests/recent/recent'

export const useRecentUpdates = () => {
  const { data, error, isLoading } = useSWR(`/api/snippets`, getRecentUpdates)

  return {
    recentUpdates: data,
    isLoadingRecentUpdates: isLoading,
    isRecentUpdatesError: error,
  }
}
