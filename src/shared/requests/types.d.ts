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

export type ResponseArrayData<T> = {
  data: Data<T>[]
  meta: Metadata
}

export type ResponseArray<T> = {
  data: ResponseArrayData<T>
}

export type Response<T> = {
  data: {
    data: Data<T>
  }
}
