import { ISEO } from './ISEO'

export interface IFeaturedImage {
  srcSet: string
  src: string
  alt: string
  width: number
  height: number
}

export interface IBasePage {
  title: string
  content: string
  seo: ISEO
  relatedProducts: number[]
  youtubeId: string | null
  featuredImage?: IFeaturedImage
}

export interface IPage extends IBasePage {}

export interface IPost extends IBasePage {
  id: number
  date: string
}

export interface IPostListItem {
  title: string
  date: string
  slug: string
  excerpt: string
  featuredImage?: IFeaturedImage
}

interface IPostNode {
  node: IPost
}

export interface IPosts {
  pageInfo: { hasNextPage: boolean; endCursor: string }
  edges: IPostNode[]
}
