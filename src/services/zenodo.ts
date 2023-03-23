import { StrapiWebhookBody, WebhookBlock } from '../pages/api/zenodo'
import { getBlock } from '../repositories/strapi'
import {
  createZenodoEntry,
  uploadZenodoFile,
} from '../repositories/zenodo/zenodo'
import * as database from '../repositories/zenodo-database'
import { InternalApiError } from '../shared/error/internal-api-error'
import { NotImplementedError } from '../shared/error/not-implemented-error'
import {
  AuthorOneLevelDeep,
  BlockTwoLevelsDeep,
  Data,
  Keyword,
  LearningMaterialType,
  Locale,
} from '../types'
import {
  ISO639_2_LanguageCode,
  ZenodoBody,
  ZenodoCreator,
} from '../repositories/zenodo/types'
import { convertMarkdownImagesToLocalReferences } from './zenodo-images'
import { BadRequestError } from '../shared/error/bad-request-error'
import { Type } from '@prisma/client'

const ZENODO_DEPOSIT_BASE_URL = 'https://zenodo.org/deposit'

export const publishZenodoEntry = async (
  webhookBody: StrapiWebhookBody<WebhookBlock>
) => {
  if (
    webhookBody.model &&
    webhookBody.entry?.vuid &&
    webhookBody.entry.versionNumber
  ) {
    const existingEntry = await database.getEntry(
      webhookBody.entry?.vuid,
      webhookBody.entry.versionNumber
    )

    if (existingEntry && existingEntry.created_on_zenodo) {
      throw new BadRequestError(
        `Entry with vuid '${webhookBody.entry.vuid}' and version '${webhookBody.entry.versionNumber}' has already been created on Zenodo: ${ZENODO_DEPOSIT_BASE_URL}/${existingEntry.zenodo_deposit_id}`
      )
    }

    const databaseEntry = await database.upsertEntry(
      webhookBody.entry?.vuid,
      webhookBody.entry.versionNumber,
      webhookBody.model.toUpperCase() as Type
    )

    const strapiContent = await getStrapiContent(
      webhookBody.model.toUpperCase() as LearningMaterialType,
      webhookBody.entry.id
    )

    const body = generateZenodoBody(strapiContent)

    const zenodoCreationResponse = await createZenodoEntry(body)

    await database.updateEntryWithZenodoCreation(
      databaseEntry.id,
      zenodoCreationResponse.created,
      zenodoCreationResponse.id
    )

    const updatedZenodoEntities = await convertMarkdownImagesToLocalReferences(
      strapiContent.attributes.Document
    )

    await uploadZenodoFile(
      zenodoCreationResponse.links.bucket,
      `${strapiContent.attributes.Title}.md`,
      updatedZenodoEntities.document
    )

    console.info(
      `Successfully uploaded file with name '${strapiContent.attributes.Title}.md'`
    )

    await Promise.all(
      updatedZenodoEntities.images.map(async (image) => {
        await uploadZenodoFile(
          zenodoCreationResponse.links.bucket,
          image.name,
          image.uint8Array
        )
        console.info(`Successfully uploaded image with name '${image.name}'`)
      })
    )

    console.info(
      `Successfully created the following Zenodo deposit: ${ZENODO_DEPOSIT_BASE_URL}/${zenodoCreationResponse.id}`
    )
  } else {
    throw new InternalApiError(
      `Cannot publish entry without model, vuid and version of the Strapi entry. Got model: '${webhookBody.model}', vuid: '${webhookBody.entry?.vuid}' and version: '${webhookBody.entry?.versionNumber}'`
    )
  }

  return {
    message: 'Entry successfully published to Zenodo',
  }
}

const generateZenodoBody = (data: Data<BlockTwoLevelsDeep>): ZenodoBody => {
  return {
    metadata: {
      title: data.attributes.Title,
      description: data.attributes.Abstract,
      upload_type: 'lesson',
      creators: data.attributes.Authors.data.map(formatCreator),
      version: data.attributes.versionNumber?.toString(),
      language: localeToISO639_2_Format(data.attributes.locale),
      keywords: formatKeywords(data.attributes.Keywords.data),
    },
  }
}

const formatKeywords = (keywords: Data<Keyword>[]): string[] | undefined => {
  if (keywords.length > 0) {
    return keywords.map((keyword) => keyword.attributes.Keyword)
  }
  return undefined
}

const localeToISO639_2_Format = (locale: Locale): ISO639_2_LanguageCode => {
  switch (locale) {
    case 'en':
      return 'eng'
    case 'es-ES':
      return 'spa'
    default:
      return 'eng'
  }
}

const formatCreator = (author: Data<AuthorOneLevelDeep>): ZenodoCreator => {
  return {
    name: `${author.attributes.LastName}, ${author.attributes.FirstName}`,
    affiliation: author.attributes.Affiliation.data?.attributes?.Affiliation,
    orcid: author.attributes.ORCID,
  }
}

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
