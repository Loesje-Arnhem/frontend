import type { ResponseImageType } from './FeaturedImageResponseType'
import type { ResponseRelatedPoster } from './ResponseRelatedPoster'
import type { ResponseRelatedProduct } from './ResponseRelatedProduct'
import type { ISEO } from '~/types/ISEO'

export type ResponsePost = {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  yoast_head_json: ISEO
  date: string
  _embedded: {
    'wp:featuredmedia'?: ResponseImageType[]
  }
  acf: {
    youtube_id: string
    related_posters_title: string
    related_posters_search: string
    related_posters_subjects: [number] | false
    related_products_title: string | null
    related_posters_posters: ResponseRelatedPoster[] | false
    related_products_products: ResponseRelatedProduct[] | false
  }
}
