import { IResponseImage } from "./IResponseImage"

export interface IResponsePosters {
  id: number
  title: {
    rendered: string
  }
  slug: string
  _embedded: {
    'wp:featuredmedia'?: IResponseImage[]
  }
}