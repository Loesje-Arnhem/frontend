import { IResponseImage } from "./IResponseImage"
import { IResponseTerm } from "./IResponseTerm"

export interface IResponseDailyPoster {
  id: number
  title: {
    rendered: string
  }
  _embedded: {
    'wp:featuredmedia'?: IResponseImage[]
    'wp:term'?: IResponseTerm[][]
  }
  acf: {
    pdf: string
    date: string
  }
}
