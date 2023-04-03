import { ISEO } from "~~/interfaces/ISEO"
import { IResponseImage } from "./IResponseImage"
import { IResponseRelatedPoster } from "./IResponseRelatedPoster"
import { IResponseRelatedProduct } from "./IResponseRelatedProduct"

export interface IResponsePost {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  yoast_head_json: ISEO
  date: string
  _embedded: {
    'wp:featuredmedia'?: IResponseImage[]
  }
  acf: {
    youtube_id: string
    related_posters_title: string
    related_posters_search: string
    related_posters_subjects: [number] | false
    related_products_title: string | null
    related_posters_posters: IResponseRelatedPoster[] | false
    related_products_products: IResponseRelatedProduct[] | false

  }
}