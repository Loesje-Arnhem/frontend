import { type ISEO } from './ISEO'
import { type IVideo, type IFeaturedImage } from './IMedia'
import { type IRelatedPostersBase } from './IPoster'
import { type IRelatedProducts } from './IProduct'

export type INodeBase = {
  id: string
  databaseId: number
}

export type INodeWithTitle = INodeBase & {
  title: string
}

export type INodeWithUri = INodeWithTitle & {
  uri: string
}

export type IBaseContent = INodeWithTitle & {
  seo: ISEO
}

export type IRelatedContent = INodeWithUri & {
  excerpt: string
}

export type IDetailsContent = IBaseContent & {
  featuredImage: IFeaturedImage | null
  content: string
  videoGroup: IVideo
  relatedPosters: IRelatedPostersBase
  relatedProducts: IRelatedProducts
}

export type IPageInfo = {
  endCursor: string
  hasNextPage: boolean
}
