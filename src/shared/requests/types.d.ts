import { Data } from '../../types'

export type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

type MetaData = {
  pagination: Pagination
}

export type ResponseArrayData<T> = {
  data: Data<T>[]
  meta: MetaData
}

export type ResponseArray<T> = {
  data: ResponseArrayData<T>
}

export type Response<T> = {
  data: {
    data: Data<T>
  }
}
