import axios, { AxiosRequestConfig } from 'axios'
import { ZenodoBody, CreationResponseBody } from './types'

export const createZenodoEntry = async (
  body: ZenodoBody,
  config: AxiosRequestConfig
): Promise<CreationResponseBody> => {
  const response = await axios.post(
    'https://zenodo.org/api/deposit/depositions',
    body,
    config
  )
  return response.data
}
