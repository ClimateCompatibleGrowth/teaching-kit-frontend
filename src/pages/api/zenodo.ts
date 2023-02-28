import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { LearningMaterialType } from '../../types'
import FormData from 'form-data'
import fs from 'fs'

type StrapiWebhookRequest = NextApiRequest & {
  body: {
    model?: LearningMaterialType
    entry?: { id?: number }
  }
}

//NOTE Authors är för djupt nässlat så jag måste gå in i req och hämta IDt för blocket i fråga och sen göra en ny fetchning mot strapi för att hämta Author

const ACCESS_TOKEN =
  'VsZ75e6lZcKh0Ye9DyTHnuLtXlvp3GcUKjBP5Dn8JE12ixPwrewb9ZPlBLp7'
let url: string = ''

export default async function postHandler(
  req: StrapiWebhookRequest,
  res: NextApiResponse
) {
  const body = {}
  const config = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      preserve_doi: true,
    },
  }

  await axios
    .post('https://zenodo.org/api/deposit/depositions', body, config)
    .then((response) => {
      console.log(response.status)
      // 201
      console.log(response.data)
      console.log(response.data.links.bucket, 'BUCKET')
      url = response.data.links.bucket
    })
    .catch((error) => {
      console.log(error.response.data)
    })

  putHandler(url)
}

const putHandler = async (url: string) => {
  const filePath = 'src/files/React.zip'
  const fileName = 'testZip'
  const token = ACCESS_TOKEN
  let params = { access_token: token }
  console.log(url, 'URL')

  let headers = {
    'Content-type': 'application/zip',
  }

  const form = new FormData()

  const stream = fs.createReadStream(filePath)
  form.append('file', stream)

  const requestConfig = {
    data: {
      name: fileName,
      ...form,
    },
    headers: headers,
    params: params,
  }

  let bucketURL = `${url}/${fileName}`
  console.log(bucketURL, 'BUCKET URL')

  axios
    .put(
      'https://zenodo.org/api/files/4a268695-08c2-49e2-a4e5-8209ada4260c/testZip',
      requestConfig
    )
    .then((response) => {
      console.log(response.status)
      // 201
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
}
