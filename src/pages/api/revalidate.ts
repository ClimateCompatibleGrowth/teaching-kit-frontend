import type { NextApiRequest, NextApiResponse } from 'next'
import { LearningMaterialType } from '../../types'

type StrapiWebhookRequest = NextApiRequest & {
  body: {
    model?: LearningMaterialType
    entry?: { id?: number }
  }
}

export default async function handler(
  req: StrapiWebhookRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.INCREMENTAL_STATIC_REGENERATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const body = req.body

  if (body.model && body.entry?.id) {
    const pathToPurge = getPathToPurge(body.model, body.entry.id)
    try {
      if (!pathToPurge) {
        throw new Error(
          `Could not purge path, seems invalid: ${body.model}, ${body.entry.id}`
        )
      }
      await res.revalidate(pathToPurge)
      return res.json({ revalidated: true })
    } catch (err) {
      return res.status(500).send('Error revalidating')
    }
  }

  return res.status(200).json({
    message:
      'The change was not made in a block/lecture/course. Such change will be reflected after the next scheduled purge instead.',
  })
}

const getPathToPurge = (contentType: LearningMaterialType, id: number) => {
  switch (contentType.toLowerCase()) {
    case 'course':
      return `/courses/${id}`
    case 'lecture':
      return `/lectures/${id}`
    case 'block':
      return `/blocks/${id}`
    default:
      return undefined
  }
}
