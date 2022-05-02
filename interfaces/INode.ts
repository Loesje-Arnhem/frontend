import { ISEO } from './ISEO'
import { IVideoGroup } from './IVideo'
import { IRelatedPosters } from './IPoster'
import { IRelatedProducts } from './IRelatedProducts'

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
  content: string
  videoGroup: IVideoGroup
  relatedPosters: IRelatedPosters
  relatedProducts: IRelatedProducts
}

export interface IPageInfo {
  endCursor: string
  hasNextPage: boolean
}

export interface IFeaturedImage {
  node: {
    id: string
    medium: string
  }
}
