import { Taxonomy } from '~~/enums/taxonomy'
import { ISEO } from './ISEO'

export type IFeaturedImage = {
  srcSet: string
  src: string
  alt: string
  width: number
  height: number
}

export type IBase = {
  id: number
  title: string
}

export type IRelatedPosters = {
  subjects: number[]
  search: string | null
  posterIds: number[]
  title: string | null
}

export type IRelatedPage = IBase & {
  excerpt: string
  uri: string
}

export type IPage = IBase & {
  parentId: number
  content: string
  seo: ISEO
  relatedProducts: number[]
  youtubeId: string | null
  featuredImage?: IFeaturedImage
  relatedPosters: IRelatedPosters
}

export type IPost = IBase & {
  seo: ISEO
  date: string
  content: string
  youtubeId: string | null
  featuredImage?: IFeaturedImage
  relatedPosters: IRelatedPosters
  relatedProducts: number[]
}

export type ITag = IBase & {
  slug: string
  type: Taxonomy.Source | Taxonomy.Subject
}

export type IPoster = IBase & {
  slug: string
  date: string
  featuredImage?: IFeaturedImage
  pdf: string
  sources: ITag[]
  subjects: ITag[]
}

export type IPostListItem = IBase & {
  slug: string
  date: string
  excerpt: string
}

export type IProductListItem = IBase & {
  slug: string
  price: number | null
  regularPrice: number | null
  externalUrl: string | null
}

export type IPosterListItem = {
  id: number
  slug: string
  featuredImage?: IFeaturedImage
}

export type IDailyPoster = {
  id: number
  slug: string
  featuredImage?: IFeaturedImage
}

export type IPostersSearchResult = IBase & {
  slug: string
}

type IPostNode = {
  node: IPost
}

export type IPosts = {
  pageInfo: { hasNextPage: boolean; endCursor: string }
  edges: IPostNode[]
}