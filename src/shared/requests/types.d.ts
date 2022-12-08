import { Data } from "../../types"

export type ResponseArray<T> = {
  data: {
    data: Data<T>[]
  }
}

export type Response<T> = {
  data: {
    data: Data<T>
  }
}