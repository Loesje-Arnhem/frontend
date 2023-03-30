import { ISEO } from "~~/interfaces/ISEO"
import { IResponseImage } from "./IResponseImage"

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
    related_posters_posters:
      | {
          poster: number
        }[]
      | false
    related_products_title: string | null
    related_products_products:
      | false
      | {
          product: number
        }[]
  }
}