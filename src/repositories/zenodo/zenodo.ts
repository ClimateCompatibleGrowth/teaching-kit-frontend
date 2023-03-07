import axios from 'axios'
import FormData from 'form-data'
import { ZenodoBody, CreationResponseBody } from './types'

const headers = {
  Authorization: `Bearer ${process.env.ZENODO_API_TOKEN}`,
  'Content-Type': 'application/json',
}

export const createZenodoEntry = async (
  body: ZenodoBody
): Promise<CreationResponseBody> => {
  const response = await axios.post(
    'https://zenodo.org/api/deposit/depositions',
    body,
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}

export const uploadZenodoFile = async (
  bucketUrl: string,
  markdown: string,
  fileName: string
) => {
  const fileUrl = `${bucketUrl}/folder/${fileName}`

  const response = await axios.put(fileUrl, markdown, {
    headers: {
      Authorization: `Bearer ${process.env.ZENODO_API_TOKEN}`,
      'Content-Type': 'text/markdown',
    },
  })
  return response
}
