import type { ResponseImage } from './FeaturedImageResponseType'

export type ResponsePosters = {
  id: number
  title: {
    rendered: string
  }
  slug: string
  _embedded: {
    'wp:featuredmedia'?: ResponseImage[]
  }
}
