import axios from 'axios'
import fs from 'fs'
import { createZenodoEntry } from '../repositories/zenodo'
import * as database from '../repositories/zenodo-database'
import { InternalApiError } from '../shared/error/InternalApiError'
import { LearningMaterialType } from '../types'

type StrapiWebhookBody = {
  model?: LearningMaterialType
  entry?: { id: number; vuid?: string; version: number }
}

export const publishZenodoEntry = async (webhookBody: StrapiWebhookBody) => {
  const body = {}
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
