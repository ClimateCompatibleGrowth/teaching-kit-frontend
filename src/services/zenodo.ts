import axios from 'axios'
import fs from 'fs'
import { getBlock } from '../repositories/strapi'
import { createZenodoEntry } from '../repositories/zenodo'
import * as database from '../repositories/zenodo-database'
import { InternalApiError } from '../shared/error/internal-api-error'
import { NotImplementedError } from '../shared/error/not-implemented-error'
import { Author, Data, LearningMaterialType } from '../types'

type StrapiWebhookBody = {
  model?: LearningMaterialType
  entry?: { id: number; vuid?: string; version: number }
}

export const publishZenodoEntry = async (webhookBody: StrapiWebhookBody) => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.ZENODO_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }

  if (
    webhookBody.model &&
    webhookBody.entry?.vuid &&
    webhookBody.entry.version
  ) {
    const databaseEntry = await database.createEntry(
      webhookBody.entry?.vuid,
      webhookBody.entry.version
    )

    const strapiContent = await getStrapiContent(
      webhookBody.model,
      webhookBody.entry.id
    )

    const body = {
      metadata: {
        upload_type: 'lesson',
        // creators: strapiContent.Authors.data.map((author) => ({ name:  }))
      },
    }

    const zenodoCreationResponse = await createZenodoEntry(body, config)

    await database.updateEntryWithZenodoCreation(
      databaseEntry.id,
      zenodoCreationResponse.created
    )
    console.log(zenodoCreationResponse)
  } else {
    throw new InternalApiError(
      `Cannot publish entry without model, vuid and version of the Strapi entry. Got model: '${webhookBody.model}', vuid: '${webhookBody.entry?.vuid}' and version: '${webhookBody.entry?.version}'`
    )
  }

  return {
    message: 'Entry successfully published to Zenodo',
  }
}

// const formatAuthor = (author: Data<Author>) => {
//   return {
//     name: `${author.attributes.}`
//   }
// }

const getStrapiContent = async (type: LearningMaterialType, id: number) => {
  switch (type) {
    case 'COURSE':
      throw new NotImplementedError(
        'Support for Zenodo course publication not implemented yet!'
      )
    case 'LECTURE':
      throw new NotImplementedError(
        'Support for Zenodo lecture publication not implemented yet!'
      )
    case 'BLOCK':
      return await getBlock(id)
  }
}
