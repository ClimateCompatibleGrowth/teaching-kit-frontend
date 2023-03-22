import prisma from '../../prisma/prisma'
import { InternalApiError } from '../shared/error/internal-api-error'

export const createEntry = async (strapiId: string, entryVersion: number) => {
  return await prisma.zenodo_entry.upsert({
    where: {
      entry_identifier: {
        strapi_entry_id: strapiId,
        strapi_entry_version: entryVersion,
      },
    },
    create: {
      strapi_entry_id: strapiId,
      strapi_entry_version: entryVersion,
    },
    update: {},
  })
}

export const updateEntryWithZenodoCreation = async (
  entryId: string,
  createdAt: string,
  depositId: number
) => {
  if (typeof createdAt !== 'string') {
    throw new InternalApiError(
      `Can't update entry with id '${entryId}', createdAt must be a timestamp string - got '${createdAt}'`
    )
  }
  return await prisma.zenodo_entry.update({
    where: {
      id: entryId,
    },
    data: {
      created_on_zenodo: createdAt,
      zenodo_deposit_id: depositId,
    },
  })
}
