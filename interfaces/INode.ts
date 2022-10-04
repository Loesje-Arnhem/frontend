import { ISEO } from './ISEO'
import { IVideoGroup, IFeaturedImage } from './IMedia'
import { IRelatedPostersBase } from './IPoster'
import { IRelatedProducts } from './IProduct'

export interface INodeBase {
  id: string
  databaseId: number
}

export interface INodeWithTitle extends INodeBase {
  title: string
}

export interface INodeWithUri extends INodeWithTitle {
  uri: string
}

export interface IBaseContent extends INodeWithTitle {
  seo: ISEO
}

export interface IRelatedContent extends INodeWithUri {
  excerpt: string
}

export interface IDetailsContent extends IBaseContent {
  featuredImage: IFeaturedImage | null
  content: string
  videoGroup: IVideoGroup
  relatedPosters: IRelatedPostersBase
  relatedProducts: IRelatedProducts
}

export interface IPageInfo {
  endCursor: string
  hasNextPage: boolean
}
