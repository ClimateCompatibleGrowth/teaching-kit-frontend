export type ZenodoBody = {
  metadata?: ZenodoMetadata
}

type UploadType = 'lesson'

export type ZenodoCreator = {
  name: `${string}, ${string}`
  affiliation?: string
  orcid?: string
}

type ZenodoMetadata = {
  title: string
  description: string
  upload_type: UploadType
  creators: ZenodoCreator[]
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
