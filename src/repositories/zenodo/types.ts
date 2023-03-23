export type ZenodoBody = {
  metadata?: ZenodoMetadata
}

type UploadType = 'lesson'

export type ZenodoCreator = {
  name: `${string}, ${string}`
  affiliation?: string
  orcid?: string
}

export type ISO639_2_LanguageCode = 'eng' | 'spa' | 'fre'

type ZenodoMetadata = {
  title: string
  description: string
  upload_type: UploadType
  creators: ZenodoCreator[]
  version?: string
  language: ISO639_2_LanguageCode
  keywords?: string[]
}

export type CreationResponseBody = {
  created: string
  id: number
  links: {
    bucket: string
  }
  metadata: {
    prereserve_doi: {
      doi: string
      recid: string
    }
  }
  modified: string
  state: string
  submitted: boolean
}
