import { IRelatedProducts } from './IRelatedProducts'
import { ITaxanomies } from './ITaxonomy'
import { IFeaturedImage } from './IMedia'
import { IBaseContent, INodeWithUri, IPageInfo } from '~/interfaces/INode'

export interface IRelatedPoster extends INodeWithUri {
  featuredImage: IFeaturedImage | null
  slug: string
}

export interface IPosterAutocomplete {
  node: INodeWithUri
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
  featuredImage: IFeaturedImage | null
  relatedPosters: IRelatedPoster
  relatedProducts: IRelatedProducts
  sources: ITaxanomies
  subjects: ITaxanomies
}
