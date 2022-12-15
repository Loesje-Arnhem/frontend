import { IRelatedProducts } from './IProduct'
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

interface IPosterMetaGroup {
  date: string
  pdf: {
    mediaItemUrl: string
  }
}

export interface IPoster extends IBaseContent {
  slug: string
  date: string
  link: string
  relatedPosters: IRelatedPoster
  relatedProducts: IRelatedProducts
  sources: ITaxanomies
  subjects: ITaxanomies
  PosterMetaGroup: IPosterMetaGroup
  featuredImage: IFeaturedImage
}
