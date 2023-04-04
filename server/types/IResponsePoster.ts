import { IResponseImage } from "./IResponseImage"

export interface IResponsePoster {
  id: number
  title: {
    rendered: string
  }
  slug: string
  _embedded: {
    'wp:featuredmedia'?: IResponseImage[]
  }
}
