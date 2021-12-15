import { IContent } from '~/interfaces/IContent'
import { IFeaturedImageBase } from '~/interfaces/IFeaturedImageBase'

export interface IFeaturedImage extends IFeaturedImageBase {
  medium: string
}

export interface IPoster extends IContent {
  uri: string
  featuredImage: {
    node: IFeaturedImage
  }
}

export interface IPosterDetails extends IContent {
  date: string
  uri: string
  link: string
  featuredImage: {
    node: {
      id: string
      large: string
      medium: string
    }
  }
}

export interface IPosters {
  edges: {
    nodes: IPoster[]
  }
}
