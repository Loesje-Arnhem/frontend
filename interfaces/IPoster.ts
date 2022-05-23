import { IRelatedProducts } from './IRelatedProducts'
import { ITaxanomies } from './ITaxonomy'
import { IBaseContent, INodeWithUri, IPageInfo } from '~/interfaces/INode'

export interface IPosterDetailFeaturedImage {
  node: {
    id: string
    medium: string
  }
}

export interface IRelatedPoster extends INodeWithUri {
  featuredImage: IPosterDetailFeaturedImage
  slug: string
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
  slug: string
  date: string
  link: string
  featuredImage: IPosterDetailFeaturedImage | null
  relatedPosters: IRelatedPoster
  relatedProducts: IRelatedProducts
  sources: ITaxanomies
  subjects: ITaxanomies
}
