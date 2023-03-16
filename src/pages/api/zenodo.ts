import type { NextApiRequest, NextApiResponse } from 'next'
import { Block, Course, Lecture } from '../../types'
import { Prisma } from '@prisma/client'
import { publishZenodoEntry } from '../../services/zenodo'
import { InternalApiError } from '../../shared/error/internal-api-error'

type WebhookBaseEntry = {
  id: number
}

export type WebhookBlock = WebhookBaseEntry & Block
export type WebhookLecture = WebhookBaseEntry & Lecture
export type WebhookCourse = WebhookBaseEntry & Course

type StrapiWebhookRequest<
  T extends WebhookBlock | WebhookLecture | WebhookCourse
> = NextApiRequest & {
  body: StrapiWebhookBody<T>
}

type StrapiModel = 'course' | 'lecture' | 'block'

export type StrapiWebhookBody<T> = {
  model?: StrapiModel
  entry?: T
}

export default async function postHandler(
  req: StrapiWebhookRequest<WebhookBlock>,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.ZENODO_PUBLISH_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  let webhookBody: StrapiWebhookBody<WebhookBlock> = {}

  try {
    webhookBody = req.body
    const zenodoPublishResponse = await publishZenodoEntry(webhookBody)
    return res.status(200).json(zenodoPublishResponse)
  } catch (error) {
    console.log(
      `Unexpected error handling entry with strapi entry id '${webhookBody?.entry?.vuid}' and strapi entry version '${webhookBody?.entry?.versionNumber}'\n`,
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
