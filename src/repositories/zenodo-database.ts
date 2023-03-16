import prisma from '../../prisma/prisma'
import { InternalApiError } from '../shared/error/internal-api-error'

export const createEntry = async (strapiId: string, entryVersion: number) => {
  return await prisma.zenodo_entry.create({
    data: {
      strapi_entry_id: strapiId,
      strapi_entry_version: entryVersion,
    },
  })
}

export const updateEntryWithZenodoCreation = async (
  entryId: string,
  createdAt: string
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
    },
  })
}
