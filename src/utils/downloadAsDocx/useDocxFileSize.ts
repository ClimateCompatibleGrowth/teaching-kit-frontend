import { useEffect, useState } from 'react'
import { Data, DownloadableContent } from '../../types'
import { getContentSize } from './downloadAsDocx'

export const useDocxFileSize = (data: Data<DownloadableContent>) => {
  const [size, setSize] = useState<string>('')

  const getFileSize = async () => {
    setSize(await getContentSize(data))
  }
  useEffect(() => {
    getFileSize()
  }, [])

  return size
}
