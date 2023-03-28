import { ISEO } from './ISEO'

export interface IFeaturedImage {
  srcSet: string
  src: string
  alt: string
  width: number
  height: number
}

export interface IBase {
  id: number
  title: string
}

export interface IRelatedPosters {
  subjects: number[]
  search: string | null
  posterIds: number[]
  title: string | null
}

export interface IBasePage extends IBase {
  parentId: number
  content: string
  seo: ISEO
  relatedProducts: number[]
  youtubeId: string | null
  featuredImage?: IFeaturedImage
  relatedPosters: IRelatedPosters
}

export interface IPage extends IBasePage {}

export interface IPost extends IBase {
  date: string
  excerpt: string
}

export interface IPoster extends IBase {
  date: string
  featuredImage?: IFeaturedImage
  pdf: string
}

export interface IPostListItem {
  title: string
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
