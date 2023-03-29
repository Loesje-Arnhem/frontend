import { IResponseImage } from "./IResponseImage"

export interface IResponsePosters {
  title: {
    rendered: string
  }
  slug: string
  _embedded: {
    'wp:featuredmedia'?: IResponseImage[]
  }
}