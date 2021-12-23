import { ISEO } from './ISEO'
import { IContent } from '~/interfaces/IContent'
import { IFeaturedImageBase } from '~/interfaces/IFeaturedImageBase'

interface IPosterBase extends IContent {
  uri: string
}

export interface IPosterFeaturedImage extends IFeaturedImageBase {
  medium: string
}

export interface IPosterDetailFeaturedImage extends IFeaturedImageBase {
  large: string
  medium: string
}

export interface IPosterFeaturedImageNode {
  node: IPosterFeaturedImage
}

export interface IPoster extends IPosterBase {
  featuredImage: IPosterFeaturedImageNode | null
}

export interface IPosterNode {
  node: IPoster
}

export interface IPosterDetails extends IPosterBase {
  date: string
  link: string
  featuredImage: IPosterDetailFeaturedImage | null
  seo: ISEO
}

export interface IPosters {
  edges: {
    nodes: IPoster[]
  }
}
