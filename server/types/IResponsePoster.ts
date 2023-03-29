import { IResponseImage } from "./IResponseImage"
import { IResponseTerm } from "./IResponseTerm"

export interface IResponsePoster {
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
