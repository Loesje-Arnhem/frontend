import { Taxonomy } from '~~/enums/taxonomy'
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

export interface IRelatedPage extends IBase {
  excerpt: string
  uri: string
}

export interface IPage extends IBase {
  parentId: number
  content: string
  seo: ISEO
  relatedProducts: number[]
  youtubeId: string | null
  featuredImage?: IFeaturedImage
  relatedPosters: IRelatedPosters
}

export interface IPost extends IBase {
  seo: ISEO
  date: string
  content: string
  youtubeId: string | null
  featuredImage?: IFeaturedImage
  relatedPosters: IRelatedPosters
  relatedProducts: number[]
}

export interface ITag extends IBase {
  slug: string
  type: Taxonomy.Source | Taxonomy.Subject
}

export interface IPoster extends IBase {
  date: string
  featuredImage?: IFeaturedImage
  pdf: string
  sources: ITag[]
  subjects: ITag[]
}

export interface IPostListItem extends IBase {
  slug: string
  date: string
  excerpt: string
}

export interface IProductListItem extends IBase {
  slug: string
  price: number | null
  regularPrice: number | null
  externalUrl: string | null
}


export interface IPosterListItem extends IBase {
  slug: string
  featuredImage?: IFeaturedImage
}

export interface IDailyPoster {
  id: number
  slug: string
  featuredImage?: IFeaturedImage
}

export interface IPostersSearchResult extends IBase {
  slug: string
}

interface IPostNode {
  node: IPost
}

export interface IPosts {
  pageInfo: { hasNextPage: boolean; endCursor: string }
  edges: IPostNode[]
}
