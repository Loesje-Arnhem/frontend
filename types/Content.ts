import { type ISEO } from './ISEO'
import type { Taxonomy } from '~~/enums/taxonomy'

export type FeaturedImage = {
  srcSet: string
  src: string
  alt: string
  width?: number
  height?: number
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

export type IRelatedProducts = {
  productIds: number[]
  title: string | undefined
}

export type IRelatedPage = IBase & {
  excerpt: string
  uri: string
}

export type IPage = IBase & {
  parentId: number
  content: string
  seo: ISEO
  description: string
  youtubeId?: string
  featuredImage?: FeaturedImage
  relatedPosters: IRelatedPosters
  relatedProducts?: IRelatedProducts
}

export type IPost = IBase & {
  seo: ISEO
  date: string
  content: string
  description: string
  youtubeId?: string
  featuredImage?: FeaturedImage
  relatedPosters: IRelatedPosters
  relatedProducts?: IRelatedProducts
}

export type ITag = IBase & {
  slug: string
  type: Taxonomy.Source | Taxonomy.Subject
}

export type IPoster = IBase & {
  slug: string
  date?: string
  featuredImage?: FeaturedImage
  pdf: string
  sources: ITag[]
  subjects: ITag[]
  relatedProducts?: IRelatedProducts
}

export type IPostListItem = IBase & {
  slug: string
  date: string
  excerpt: string
}

export type IProductListItem = IBase & {
  url: string
  slug: string
  price?: number
  regularPrice?: number
  externalUrl: string | null
  image?: FeaturedImage
}

export type IProduct = IBase & {
  price?: number
  regularPrice?: number
  excerpt: string
  description: string
  images: FeaturedImage[]
  relatedProductIds: number[]
  attributes: {
    taxonomy: string
    id: number
    name: string
    terms: {
      slug: string
      name: string
    }[]
  }[]
}

export type IPosterListItem = {
  id: number
  title: string
  slug: string
  featuredImage?: FeaturedImage
}

export type IDailyPoster = {
  id: number
  slug: string
  featuredImage?: FeaturedImage
}

export type IPostersSearchResult = IBase & {
  slug: string
}

type IPostNode = {
  node: IPost
}

export type IPosts = {
  pageInfo: { hasNextPage: boolean, endCursor: string }
  edges: IPostNode[]
}

export type IProductCategory = IBase & {
  content: string
}
