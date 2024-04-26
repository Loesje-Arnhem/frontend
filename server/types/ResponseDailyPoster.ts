import { type ResponseImage } from './FeaturedImageResponseType'

export type ResponseDailyPoster = {
  id: number
  title: {
    rendered: string
  }
  slug: string
  _embedded: {
    'wp:featuredmedia'?: ResponseImage[]
  }
}
