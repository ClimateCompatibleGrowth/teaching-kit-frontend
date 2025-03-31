import type { NextApiRequest, NextApiResponse } from 'next'
import { LearningMaterialType } from '../../types'

type StrapiWebhookRequest = NextApiRequest & {
  body: {
    model?: LearningMaterialType
    entry?: { vuid?: string }
  }
}

// See documentation in /docs/revalidate-endpoint.md
export default async function handler(
  req: StrapiWebhookRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.INCREMENTAL_STATIC_REGENERATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const body = req.body

  if (body.model && body.entry?.vuid) {
    const pathToPurge = getPathToPurge(body.model, body.entry.vuid)
    try {
      if (!pathToPurge) {
        throw new Error(
          `Could not purge path, seems invalid: ${body.model}, ${body.entry.vuid}`
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

const getPathToPurge = (contentType: LearningMaterialType, vuid: number) => {
  switch (contentType.toLowerCase()) {
    case 'course':
      return `/courses/${vuid}`
    case 'lecture':
      return `/lectures/${vuid}`
    default:
      return undefined
  }
}
