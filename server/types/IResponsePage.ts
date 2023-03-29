import { ISEO } from "~~/interfaces/ISEO"
import { IResponseImage } from "./IResponseImage"

export interface IResponsePage {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  parent: number
  yoast_head_json: ISEO
  youtube_id: string
  acf: {
    related_posters_title: string | null
    related_posters_search: string | null
    related_posters_subjects: [number]
    related_posters_posters:
      | {
          poster: number
        }[]
      | null
    related_products_title: string | null
    related_products_products:
      | null
      | {
          product: number
        }[]
  }
  _embedded: {
    'wp:featuredmedia'?: IResponseImage[]
  }
}