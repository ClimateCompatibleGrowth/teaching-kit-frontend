import type { NextApiRequest, NextApiResponse } from 'next'
import { LearningMaterialType } from '../../types'
import { Prisma } from '@prisma/client'
import { publishZenodoEntry } from '../../services/zenodo'
import { InternalApiError } from '../../shared/error/InternalApiError'

type StrapiWebhookRequest = NextApiRequest & {
  body: StrapiWebhookBody
}

type StrapiWebhookBody = {
  model?: LearningMaterialType
  entry?: { id: number; vuid?: string; version: number }
}

//NOTE Authors är för djupt nässlat så jag måste gå in i req och hämta IDt för blocket i fråga och sen göra en ny fetchning mot strapi för att hämta Author

export default async function postHandler(
  req: StrapiWebhookRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.ZENODO_PUBLISH_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  let webhookBody: StrapiWebhookBody = {}

  try {
    throw new InternalApiError('API endpoint not yet implemented')
    webhookBody = req.body.body
    const zenodoPublishResponse = await publishZenodoEntry(webhookBody)
    return res.status(200).json(zenodoPublishResponse)
  } catch (error) {
    console.log(
      `Unexpected error handling entry with strapi entry id '${webhookBody.entry?.vuid}' and strapi entry version '${webhookBody.entry?.version}'\n`,
      error
    )
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        error:
          'There is a unique constraint violation; an entry with that entry id and entry version already exists in the database.',
      })
    } else if (error instanceof InternalApiError) {
      return res.status(500).json({
        error: error.message,
      })
    }
    res.status(500).json({
      message: 'Something went wrong...',
    })
  }
}
