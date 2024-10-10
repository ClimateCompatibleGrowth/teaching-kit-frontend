export type ZenodoBody<T extends BlockMetadata | LectureMetadata> = {
  metadata?: T
}

type UploadType = 'lesson'

export type ZenodoCreator = {
  name: `${string}, ${string}`
  affiliation?: string
  orcid?: string
}

export type ISO639_2_LanguageCode = 'eng' | 'spa' | 'fre'

type Community = {
  identifier: string
}

export type BaseZenodoMetadata = {
  title: string
  description: string
  upload_type: UploadType
  version?: string
  language: ISO639_2_LanguageCode
  creators: ZenodoCreator[]
  keywords?: string[]
  communities: Community[]
}

export type BlockMetadata = BaseZenodoMetadata & {}
export type LectureMetadata = BaseZenodoMetadata & {
  related_identifiers: RelatedIdentifier[]
}
export type CourseMetadata = BaseZenodoMetadata & {
  related_identifiers: RelatedIdentifier[]
}

export type RelatedIdentifier = {
  identifier: string
  relation: 'hasPart'
}

export type CreationResponseBody = {
  created: string
  id: number
  links: {
    files: string
    bucket: string
    publish: string
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
