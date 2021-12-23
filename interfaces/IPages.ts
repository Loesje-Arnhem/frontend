import { IContent } from '~/interfaces/IContent'

export interface IPage extends IContent {
  excerpt: string
  uri: string
}

export interface IPages {
  edges: {
    nodes: IPage[]
  }
}
