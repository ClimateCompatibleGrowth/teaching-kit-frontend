import type { NextApiRequest, NextApiResponse } from 'next'
import { LearningMaterialType } from '../../types'

type StrapiWebhookRequest = NextApiRequest & {
  body: {
    model: string
    entry: {
      id: number
    }
  }
}

export default async function handler(
  req: StrapiWebhookRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.INCREMENTAL_STATIC_REGENERATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const pathToPurge = getPathToPurge(req.body.model, req.body.entry.id)

  if (pathToPurge === undefined) {
    return res.status(204).json({
      message:
        'The change was not made in a block/lecture/course. Such change will be reflected after the next scheduled purge instead.',
    })
  }

  try {
    await res.revalidate(pathToPurge)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
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
