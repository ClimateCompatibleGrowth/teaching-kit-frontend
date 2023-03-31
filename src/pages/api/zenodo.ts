import type { NextApiRequest, NextApiResponse } from 'next'
import { Block, Course, Lecture } from '../../types'
import { Prisma } from '@prisma/client'
import { processZenodoEntry } from '../../services/zenodo'
import { InternalApiError } from '../../shared/error/internal-api-error'
import { BadRequestError } from '../../shared/error/bad-request-error'
import { NoOperationError } from '../../shared/error/no-operation-error'
import axios from 'axios'

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

export type StrapiModel = 'course' | 'lecture' | 'block'

export type StrapiWebhookBody<
  T extends WebhookBlock | WebhookLecture | WebhookCourse
> = {
  model?: StrapiModel
  entry?: T
}

export type SecuredWebhookBody<
  T extends WebhookBlock | WebhookLecture | WebhookCourse
> = {
  model: StrapiModel
  entry: T
}

// See documentation in /docs/zenodo/design.md
export default async function postHandler(
  req: StrapiWebhookRequest<WebhookBlock>,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.ZENODO_PUBLISH_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  if (req.body.event !== 'entry.publish') {
    return res.status(400).json({
      message: `Only accepting publish events. Got: '${req.body.event}'`,
    })
  }
  let webhookBody: StrapiWebhookBody<WebhookBlock> = {}

  try {
    webhookBody = req.body
    const zenodoPublishResponse = await processZenodoEntry(webhookBody)
    return res.status(200).json(zenodoPublishResponse)
  } catch (error) {
    console.info(
      `Encountered an error handling entry with strapi entry id '${webhookBody?.entry?.vuid}' and strapi entry version '${webhookBody?.entry?.versionNumber}':\n`
    )
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const message =
        'There is a unique constraint violation; an entry with that entry id and entry version already exists in the database.'
      console.info(message)
      if (error.code === 'P2002') {
        return res.status(400).json({
          error: message,
        })
      }
    } else if (error instanceof InternalApiError) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    } else if (error instanceof BadRequestError) {
      console.log(error.message)
      return res.status(400).json({
        error: error.message,
      })
    } else if (error instanceof NoOperationError) {
      console.log(error.message)
      return res.status(304).json({
        error: error.message,
      })
    } else {
      console.info(`\n`, error)
    }
    if (axios.isAxiosError(error) && error.response) {
      console.info(error.response.data.errors)
      return res.status(400).json({
        message: error.response.data.errors,
      })
    }
    res.status(500).json({
      message: 'Something went wrong...',
    })
  }
}
