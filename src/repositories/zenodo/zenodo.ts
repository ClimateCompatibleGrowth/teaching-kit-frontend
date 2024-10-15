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
  filesUrl: string,
  fileName: string,
  body: any,
  fileType: string
) => {
  const formData = new FormData()
  formData.append("file", new Blob([body], { type: fileType }), fileName)
  formData.append("name", fileName)

  const response = await axios.post(filesUrl, formData, {
    headers: {
      Authorization: `Bearer ${process.env.ZENODO_API_TOKEN}`,
      "Content-Type": "multipart/form-data"
    },
  })
  return response
}

export const publishDeposit = async (publishEndpoint: string) => {
  await axios.post(publishEndpoint, {}, { headers })
}
