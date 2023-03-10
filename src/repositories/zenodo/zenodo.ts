import axios from 'axios'
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
  fileName: string,
  body: any
) => {
  const fileUrl = `${bucketUrl}/${fileName}`

  const response = await axios.put(fileUrl, body, {
    headers: {
      Authorization: `Bearer ${process.env.ZENODO_API_TOKEN}`,
      'Content-Type': 'image/jpeg',
    },
  })
  return response
}
