import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { LearningMaterialType } from '../../types'
import FormData from 'form-data'
import fs from 'fs'
import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/prisma'

type StrapiWebhookRequest = NextApiRequest & {
  body: StrapiWebhookBody
}

type StrapiWebhookBody = {
  model?: LearningMaterialType
  entry?: { id: number; vuid?: string; version: number }
}

//NOTE Authors är för djupt nässlat så jag måste gå in i req och hämta IDt för blocket i fråga och sen göra en ny fetchning mot strapi för att hämta Author

const ACCESS_TOKEN =
  'VsZ75e6lZcKh0Ye9DyTHnuLtXlvp3GcUKjBP5Dn8JE12ixPwrewb9ZPlBLp7'
let url: string = ''

export default async function postHandler(
  req: StrapiWebhookRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.ZENODO_PUBLISH_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  const webhookBody: StrapiWebhookBody = req.body.body

  const body = {}
  const config = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      preserve_doi: true,
    },
  }
  try {
    if (webhookBody.model && webhookBody.entry?.vuid) {
      // Remove comment when merged with the Zenodo API
      // const databaseEntry = await createZenodoEntry(
      //   body.entry.vuid,
      //   body.entry.version
      // )
      // Remove comment when merged with the Zenodo API
      // await updateEntryWithZenodoCreation(
      //   databaseEntry.id,
      //   new Date().toISOString()
      // )

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

    return res.status(200).json({
      message: 'Entry successfully published to Zenodo',
    })
  } catch (error) {
    console.log(
      `Unexpected error handling entry with strapi entry id '${webhookBody.entry?.vuid}' and strapi entry version '${webhookBody.entry?.version}'\n`,
      error
    )
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        error:
          'There is a unique constraint violation; an entry with that entry id and entry version already exists in the database.',
      })
    }
    res.status(500).json({
      message: 'Something went wrong...',
    })
  }
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

const createZenodoEntry = async (strapiId: string, entryVersion: number) => {
  return await prisma.zenodo_entry.create({
    data: {
      strapi_entry_id: strapiId,
      strapi_entry_version: entryVersion,
    },
  })
}

const updateEntryWithZenodoCreation = async (
  entryId: string,
  createdAt: string
) => {
  return await prisma.zenodo_entry.update({
    where: {
      id: entryId,
    },
    data: {
      created_on_zenodo: createdAt,
    },
  })
}
