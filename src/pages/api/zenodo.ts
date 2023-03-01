import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/prisma'

import { LearningMaterialType } from '../../types'

type StrapiWebhookRequest = NextApiRequest & {
  body: StrapiWebhookBody
}

type StrapiWebhookBody = {
  model?: LearningMaterialType
  entry?: { vuid?: string; version: number }
}

export default async function handler(
  req: StrapiWebhookRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.ZENODO_PUBLISH_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  const body: StrapiWebhookBody = req.body.body
  try {
    if (body.model && body.entry?.vuid) {
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
    }

    return res.status(200).json({
      message: 'Entry successfully published to Zenodo',
    })
  } catch (error) {
    console.log(
      `Unexpected error handling entry with strapi entry id '${body.entry?.vuid}' and strapi entry version '${body.entry?.version}'\n`,
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
