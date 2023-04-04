import { IResponseImage } from './IResponseImage'

export interface IResponseDailyPoster {
  id: number
  title: {
    rendered: string
  }
  slug: string
  _embedded: {
    'wp:featuredmedia'?: IResponseImage[]
  }
}
