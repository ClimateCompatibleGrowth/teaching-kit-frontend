import { Data } from '../../types'

export type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

type Metadata = {
  pagination: Pagination
}

export type ResponseArray<T> = {
  data: {
    data: Data<T>[]
    meta: Metadata
  }
}

export type Response<T> = {
  data: {
    data: Data<T>
  }
}
