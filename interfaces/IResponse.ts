import { ISEO } from './ISEO'

interface IResponseImageSize {
  width: number
  height: number
  source_url: string
}

export interface IResponseImage {
  'wp:featuredmedia'?: {
    alt_text: string
    source_url: string
    media_details: {
      width: number
      height: number
      sizes: {
        thumbnail: IResponseImageSize
        full: IResponseImageSize
        medium?: IResponseImageSize
        large?: IResponseImageSize
        medium_large?: IResponseImageSize
      }
    }
  }[]
}

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
  _embedded: IResponseImage
}

export interface IResponsePosts {
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  slug: string
  date: string
  _embedded: IResponseImage
}

export interface IResponsePosters {
  title: {
    rendered: string
  }
  slug: string
  _embedded: IResponseImage
}

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
  _embedded: IResponseImage
}

export interface IResponsePoster {
  id: number
  title: {
    rendered: string
  }
  _embedded: IResponseImage
  acf: {
    pdf: string
    date: string
  }
}

export interface IResponseRelatedPage {
  id: number
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  link: string
}
