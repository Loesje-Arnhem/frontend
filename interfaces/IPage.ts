import { ISEO } from './ISEO'
import { IVideoGroup } from './IVideo'
import { IContent, IRelatedContent } from '~/interfaces/IContent'

export interface IPageDetail extends IContent {
  content: string
  seo: ISEO
  videoGroup: IVideoGroup
}

export interface IRelatedPage extends IRelatedContent {}

export interface IPages {
  edges: {
    nodes: IRelatedPage[]
  }
}
