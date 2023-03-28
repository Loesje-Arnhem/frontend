import { ISEO } from './ISEO'

export interface IFeaturedImage {
  srcSet: string
  src: string
  alt: string
  width: number
  height: number
}

export interface IRelatedPosters {
  subjects: number[]
  search: string | null
  posterIds: number[]
  title: string | null
}

export interface IBasePage {
  id: number
  parentId: number
  title: string
  content: string
  seo: ISEO
  relatedProducts: number[]
  youtubeId: string | null
  featuredImage?: IFeaturedImage
  relatedPosters: IRelatedPosters
}

export interface IRelatedPage {
  id: number
  title: string
  excerpt: string
  uri: string
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

export interface IPosterListItem {
  title: string
  slug: string
  featuredImage?: IFeaturedImage
}

interface IPostNode {
  node: IPost
}

export interface IPosts {
  pageInfo: { hasNextPage: boolean; endCursor: string }
  edges: IPostNode[]
}
