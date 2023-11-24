import { type ISEO } from '~~/types/ISEO'
import { type ResponseImage } from './ResponseImage'
import { type ResponseRelatedPoster } from './ResponseRelatedPoster'
import { type ResponseRelatedProduct } from './ResponseRelatedProduct'

export type ResponsePage = {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  parent: number
  yoast_head_json: ISEO
  acf: {
    youtube_id: string
    related_posters_title: string
    related_posters_search: string
    related_posters_subjects: [number] | false
    related_products_title: string | null
    related_posters_posters: ResponseRelatedPoster[] | false
    related_products_products: ResponseRelatedProduct[] | false
  }
  _embedded: {
    'wp:featuredmedia'?: ResponseImage[]
  }
}