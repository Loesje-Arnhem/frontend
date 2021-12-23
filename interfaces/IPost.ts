import { ISEO } from './ISEO'
import { IVideoGroup } from './IVideo'
import { IContent, IRelatedContent } from '~/interfaces/IContent'

export interface IPostDetail extends IContent {
  date: string
  content: string
  seo: ISEO
  videoGroup: IVideoGroup
}

export interface IRelatedPost extends IRelatedContent {
  date: string
}

export interface IPosts {
  edges: {
    nodes: IRelatedPost[]
  }
}
