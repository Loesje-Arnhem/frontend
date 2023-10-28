import { type IRelatedProducts } from './IProduct'
import { type ITaxanomies } from './ITaxonomy'
import { type IFeaturedImage } from './IMedia'
import { type IBaseContent, type INodeWithUri, type IPageInfo } from '~/types/INode'

export type IRelatedPoster = INodeWithUri & {
  featuredImage: IFeaturedImage | null
  slug: string
}

export type IPosterAutocomplete = {
  node: INodeWithUri
}

export type IRelatedPosterNode = {
  node: IRelatedPoster
}

export type IRelatedPostersBase = {
  edges: IRelatedPosterNode[]
}

export type IRelatedPosters = IRelatedPostersBase & {
  pageInfo: IPageInfo
}

type IPosterMetaGroup = {
  date: string
  pdf: {
    mediaItemUrl: string
  }
}

export type IPoster = IBaseContent & {
  slug: string
  uri: string
  date: string
  link: string
  relatedProducts: IRelatedProducts
  sources: ITaxanomies
  subjects: ITaxanomies
  PosterMetaGroup: IPosterMetaGroup
  featuredImage: IFeaturedImage
}
