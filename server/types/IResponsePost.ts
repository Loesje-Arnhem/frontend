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
  youtube_id: string
  _embedded: {
    'wp:featuredmedia'?: IResponseImage[]
  }
}