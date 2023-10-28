import { type ResponseImage } from './ResponseImage'

export type ResponsePoster = {
  id: number
  title: {
    rendered: string
  }
  slug: string
  _embedded: {
    'wp:featuredmedia'?: ResponseImage[]
  }
  acf: {
    pdf: string
    date: string
  }
}
