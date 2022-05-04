import { IRelatedProducts } from './IRelatedProducts'
import { ITaxanomies } from './ITaxonomy'
import {
  IBaseContent,
  IFeaturedImage,
  INodeWithUri,
  IPageInfo,
} from '~/interfaces/INode'

export interface IPosterDetailFeaturedImage {
  node: {
    id: string
    large: string
    medium: string
  }
}

export interface IRelatedPoster extends INodeWithUri {
  featuredImage: IFeaturedImage | null
}

export interface IRelatedPosterNode {
  node: IRelatedPoster
}

export interface IRelatedPostersBase {
  edges: IRelatedPosterNode[]
}

export interface IRelatedPosters extends IRelatedPostersBase {
  pageInfo: IPageInfo
}

export interface IPoster extends IBaseContent {
  date: string
  link: string
  featuredImage: IPosterDetailFeaturedImage | null
  relatedPosters: IRelatedPoster
  relatedProducts: IRelatedProducts
  sources: ITaxanomies
  subjects: ITaxanomies
}
