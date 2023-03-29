import { IResponseImage } from "./IResponseImage"

export interface IResponsePosts {
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  slug: string
  date: string
  _embedded: {
    'wp:featuredmedia'?: IResponseImage[]
  }
}
