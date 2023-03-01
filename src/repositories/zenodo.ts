import axios, { AxiosRequestConfig } from 'axios'

type Body = {}

type Response = {
  body: CreationResponseBody
}

type CreationResponseBody = {
  created: string
  id: string
  links: {
    bucket: string
  }
  metadata: {
    prereserve_doi: {
      doi: string
      recid: string
    }
  }
  modified: string
  state: string
  submitted: boolean
}

export const createZenodoEntry = async (
  body: Body,
  config: AxiosRequestConfig
): Promise<CreationResponseBody> => {
  const response = await axios.post(
    'https://zenodo.org/api/deposit/depositions',
    body,
    config
  )
  return response.data
}
