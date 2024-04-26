import { type ResponseImage } from './FeaturedImageResponseType'
import { ResponseRelatedProduct } from './ResponseRelatedProduct'

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
    related_products_title: string | null
    related_products_products: ResponseRelatedProduct[] | false
  }
}
