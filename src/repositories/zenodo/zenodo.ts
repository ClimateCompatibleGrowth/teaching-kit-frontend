import axios from 'axios'
import {
  ZenodoBody,
  CreationResponseBody,
  BlockMetadata,
  LectureMetadata,
} from './types'

const headers = {
  Authorization: `Bearer ${process.env.ZENODO_API_TOKEN}`,
  'Content-Type': 'application/json',
}

export const createEntry = async (
  body: ZenodoBody<BlockMetadata | LectureMetadata>
): Promise<CreationResponseBody> => {
  const response = await axios.post(
    'https://zenodo.org/api/deposit/depositions',
    body,
    { headers }
  )
  return response.data
}

export const uploadFile = async (
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

export const publishDeposit = async (publishEndpoint: string) => {
  await axios.post(publishEndpoint, {}, { headers })
}
