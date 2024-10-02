import {
  SecuredWebhookBody,
  StrapiWebhookBody,
  WebhookBlock,
  WebhookCourse,
  WebhookLecture,
} from '../pages/api/zenodo'
import { getBlock, getCourse, getLecture } from '../repositories/strapi'
import * as zenodo from '../repositories/zenodo/zenodo'
import * as database from '../repositories/zenodo-database'
import { InternalApiError } from '../shared/error/internal-api-error'
import {
  AuthorOneLevelDeep,
  BlockTwoLevelsDeep,
  CourseThreeLevelsDeep,
  Data,
  Keyword,
  LectureTwoLevelsDeep,
  Locale,
} from '../types'
import {
  BaseZenodoMetadata,
  CreationResponseBody,
  ISO639_2_LanguageCode,
  BlockMetadata,
  ZenodoBody,
  ZenodoCreator,
  LectureMetadata,
  RelatedIdentifier,
  CourseMetadata,
} from '../repositories/zenodo/types'
import { convertMarkdownImagesToLocalReferences } from './zenodo-images'
import { BadRequestError } from '../shared/error/bad-request-error'
import { Type, zenodo_entry } from '@prisma/client'
import { getMatchingRows, Identifier } from '../repositories/zenodo-database'
import { NoOperationError } from '../shared/error/no-operation-error'
import { NotImplementedError } from '../shared/error/not-implemented-error'

const ZENODO_DEPOSIT_BASE_URL = 'https://zenodo.org/deposit'
const PUBLISHED_CHILDREN_AMOUNT_THRESHOLD_FOR_LECTURE = 1
const PUBLISHED_CHILDREN_AMOUNT_THRESHOLD_FOR_COURSE = 1
const ZENODO_CCG_COMMUNITY_IDENTIFIER = 'ccg'

export const processZenodoEntry = async (
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

    const entryHasAlreadyBeenPublishedToZenodo =
      existingEntry &&
      existingEntry.created_on_zenodo &&
      existingEntry.zenodo_doi

    if (entryHasAlreadyBeenPublishedToZenodo) {
      throw new BadRequestError(
        `Entry with vuid '${webhookBody.entry.vuid}' and version '${webhookBody.entry.versionNumber}' has already been created on Zenodo: ${ZENODO_DEPOSIT_BASE_URL}/${existingEntry.zenodo_deposit_id}`
      )
    }

    const databaseEntry = await database.upsertEntry(
      webhookBody.entry.vuid,
      webhookBody.entry.versionNumber,
      webhookBody.model.toUpperCase() as Type
    )

    const zenodoCreationResponse = await uploadStrapiContent(
      {
        entry: webhookBody.entry,
        model: webhookBody.model,
      },
      databaseEntry
    )

    console.info(
      `Successfully created the following Zenodo deposit: ${ZENODO_DEPOSIT_BASE_URL}/${zenodoCreationResponse.id}`
    )
    if (process.env.AUTOMATIC_ZENODO_PUBLISHING === 'true') {
      await publishZenodoEntry(zenodoCreationResponse)
      console.info(
        `Successfully published the following Zenodo deposit: ${ZENODO_DEPOSIT_BASE_URL}/${zenodoCreationResponse.id}`
      )
    }
  } else {
    throw new InternalApiError(
      `Cannot publish entry without model, vuid and version of the Strapi entry. Got model: '${webhookBody.model}', vuid: '${webhookBody.entry?.vuid}' and version: '${webhookBody.entry?.versionNumber}'`
    )
  }

  return {
    message: 'Entry successfully published to Zenodo',
  }
}

const publishZenodoEntry = async (
  zenodoCreationResponse: CreationResponseBody
) => {
  // Do NOT remove the following throw unless you're 100% certain what you're doing.
  throw new NotImplementedError(
    'It has not yet been decided if automatic publication should really be implemented'
  )
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
    throw new InternalApiError(
      `Can't publish Zenodo deposit from other environment than production. Tried to publish in environment: ${process.env.NEXT_PUBLIC_ENVIRONMENT}`
    )
  }
  return await zenodo.publishDeposit(zenodoCreationResponse.links.publish)
}

const generateZenodoMetadata = (
  data: Data<BlockTwoLevelsDeep | LectureTwoLevelsDeep | CourseThreeLevelsDeep>
): Omit<BaseZenodoMetadata, 'creators' | 'keywords'> => {
  return {
    title: data.attributes.Title,
    description: data.attributes.Abstract,
    upload_type: 'lesson',
    version: data.attributes.versionNumber?.toString(),
    language: localeToISO639_2_Format(data.attributes.locale),
    communities: [{ identifier: ZENODO_CCG_COMMUNITY_IDENTIFIER }],
  }
}

const generateZenodoBlockBody = (
  data: Data<BlockTwoLevelsDeep>
): ZenodoBody<BlockMetadata> => {
  return {
    metadata: {
      ...generateZenodoMetadata(data),
      creators: data.attributes.Authors.data.map(formatCreator),
      keywords: formatKeywords(data.attributes.Keywords.data),
    },
  }
}

const generateZenodoLectureBody = (
  data: Data<LectureTwoLevelsDeep>,
  relatedIdentifiers: RelatedIdentifier[]
): ZenodoBody<LectureMetadata> => {
  return {
    metadata: {
      ...generateZenodoMetadata(data),
      creators: data.attributes.LectureCreators.data.map(formatCreator),
      keywords: [
        ...new Set(
          formatKeywords(
            data.attributes.Blocks.data
              .map((block) => block.attributes.Keywords.data)
              .flat()
          )
        ),
      ],
      related_identifiers: relatedIdentifiers,
    },
  }
}

const generateZenodoCourseBody = (
  data: Data<CourseThreeLevelsDeep>,
  relatedIdentifiers: RelatedIdentifier[]
): ZenodoBody<CourseMetadata> => {
  return {
    metadata: {
      ...generateZenodoMetadata(data),
      creators: data.attributes.CourseCreators.data.map(formatCreator),
      keywords: [
        ...new Set(
          formatKeywords(
            data.attributes.Lectures.data
              .map((lecture) =>
                lecture.attributes.Blocks.data.map(
                  (block) => block.attributes.Keywords.data
                )
              )
              .flat(2)
          )
        ),
      ],
      related_identifiers: relatedIdentifiers,
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

const uploadStrapiContent = async (
  webhookBody: SecuredWebhookBody<
    WebhookBlock | WebhookLecture | WebhookCourse
  >,
  databaseEntry: zenodo_entry
): Promise<CreationResponseBody> => {
  switch (webhookBody.model) {
    case 'course':
      return await handleCourseUpload(
        webhookBody as SecuredWebhookBody<WebhookCourse>,
        databaseEntry
      )
    case 'lecture':
      return await handleLectureUpload(
        webhookBody as SecuredWebhookBody<WebhookLecture>,
        databaseEntry
      )
    case 'block':
      return await handleBlockUpload(
        webhookBody as SecuredWebhookBody<WebhookBlock>,
        databaseEntry
      )
  }
}

const handleCourseUpload = async (
  webhookBody: SecuredWebhookBody<WebhookCourse>,
  databaseEntry: zenodo_entry
): Promise<CreationResponseBody> => {
  const strapiCourse = await getCourse(webhookBody.entry.id)

  const lectures = strapiCourse.attributes.Lectures.data
    .filter((lecture) => lecture.attributes.isVisibleInListView)
    .map((lecture) => ({
      id: lecture.attributes.vuid,
      version: lecture.attributes.versionNumber,
    }))
    .filter((lecture): lecture is Identifier => lecture.version !== null)

  const zenodoLectures = await getMatchingRows(lectures)
  const publishedZenodoLectures = zenodoLectures.filter(
    (zenodoLecture): zenodoLecture is zenodo_entry & { zenodo_doi: string } =>
      zenodoLecture.zenodo_doi !== null
  )
  const courseHasEnoughPublishedLecturesToBePublished =
    publishedZenodoLectures.length >=
    PUBLISHED_CHILDREN_AMOUNT_THRESHOLD_FOR_COURSE

  if (!courseHasEnoughPublishedLecturesToBePublished) {
    throw new NoOperationError(
      `Course with id '${strapiCourse.id}' and version '${strapiCourse.attributes.versionNumber}' was not uploaded to Zenodo, because it does not have enough published child Lectures. Expected an amount of published children of ${PUBLISHED_CHILDREN_AMOUNT_THRESHOLD_FOR_COURSE}, found ${publishedZenodoLectures.length}`
    )
  }

  const childLecturesReferences: RelatedIdentifier[] =
    publishedZenodoLectures.map((zenodoLecture) => ({
      identifier: zenodoLecture.zenodo_doi,
      relation: 'hasPart',
    }))

  const body = generateZenodoCourseBody(strapiCourse, childLecturesReferences)

  const zenodoCreationResponse = await zenodo.createEntry(body)

  await database.updateEntryWithZenodoCreation(
    databaseEntry.id,
    zenodoCreationResponse.created,
    zenodoCreationResponse.id,
    zenodoCreationResponse.metadata.prereserve_doi.doi
  )

  return zenodoCreationResponse
}

const handleLectureUpload = async (
  webhookBody: SecuredWebhookBody<WebhookLecture>,
  databaseEntry: zenodo_entry
): Promise<CreationResponseBody> => {
  const strapiLecture = await getLecture(webhookBody.entry.id)

  const lectureBlocks = strapiLecture.attributes.Blocks.data
    .filter((block) => block.attributes.isVisibleInListView)
    .map((block) => ({
      id: block.attributes.vuid,
      version: block.attributes.versionNumber,
    }))
    .filter((block): block is Identifier => block.version !== null)

  const zenodoBlocks = await getMatchingRows(lectureBlocks)
  const publishedZenodoBlocks = zenodoBlocks.filter(
    (zenodoBlock): zenodoBlock is zenodo_entry & { zenodo_doi: string } =>
      zenodoBlock.zenodo_doi !== null
  )
  const lectureHasEnoughPublishedBlocksToBePublished =
    publishedZenodoBlocks.length >=
    PUBLISHED_CHILDREN_AMOUNT_THRESHOLD_FOR_LECTURE

  if (!lectureHasEnoughPublishedBlocksToBePublished) {
    throw new NoOperationError(
      `Lecture with id '${strapiLecture.id}' and version '${strapiLecture.attributes.versionNumber}' was not uploaded to Zenodo, because it does not have enough published child Lecture Blocks. Expected an amount of published children of ${PUBLISHED_CHILDREN_AMOUNT_THRESHOLD_FOR_LECTURE}, found ${publishedZenodoBlocks.length}`
    )
  }

  const childBlockReferences: RelatedIdentifier[] = publishedZenodoBlocks.map(
    (zenodoBlock) => ({
      identifier: zenodoBlock.zenodo_doi,
      relation: 'hasPart',
    })
  )

  const body = generateZenodoLectureBody(strapiLecture, childBlockReferences)

  const zenodoCreationResponse = await zenodo.createEntry(body)

  await database.updateEntryWithZenodoCreation(
    databaseEntry.id,
    zenodoCreationResponse.created,
    zenodoCreationResponse.id,
    zenodoCreationResponse.metadata.prereserve_doi.doi
  )

  return zenodoCreationResponse
}

const handleBlockUpload = async (
  webhookBody: SecuredWebhookBody<WebhookBlock>,
  databaseEntry: zenodo_entry
): Promise<CreationResponseBody> => {
  const strapiBlock = await getBlock(webhookBody.entry.id)
  const body = generateZenodoBlockBody(strapiBlock)

  const zenodoCreationResponse = await zenodo.createEntry(body)

  await database.updateEntryWithZenodoCreation(
    databaseEntry.id,
    zenodoCreationResponse.created,
    zenodoCreationResponse.id,
    zenodoCreationResponse.metadata.prereserve_doi.doi
  )

  const updatedZenodoEntities = await convertMarkdownImagesToLocalReferences(
    strapiBlock.attributes.Document
  )

  await zenodo.uploadFile(
    zenodoCreationResponse.links.bucket,
    `${strapiBlock.attributes.Title}.md`,
    updatedZenodoEntities.document,
    { "Content-Type": "text/markdown" }
  )

  console.info(
    `Successfully uploaded file with name '${strapiBlock.attributes.Title}.md'`
  )

  await Promise.all(
    updatedZenodoEntities.images.map(async (image) => {
      await zenodo.uploadFile(
        zenodoCreationResponse.links.bucket,
        image.name,
        image.uint8Array
      )
      console.info(`Successfully uploaded image with name '${image.name}'`)
    })
  )

  return zenodoCreationResponse
}
