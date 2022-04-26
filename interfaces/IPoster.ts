import { IBaseContent, IFeaturedImage, INodeWithUri } from '~/interfaces/INode'

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

export interface IPoster extends IBaseContent {
  date: string
  link: string
  featuredImage: IPosterDetailFeaturedImage | null
}

export interface IRelatedPosters {
  edges: {
    node: IRelatedPoster[]
  }
}
