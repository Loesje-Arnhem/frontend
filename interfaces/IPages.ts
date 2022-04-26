import { IDetailsContent, IRelatedContent } from './INode'

export interface IRelatedPages {
  edges: {
    nodes: IRelatedContent[]
  }
}

export interface IPage extends IDetailsContent {
  content: string
  relatedPages: IRelatedPages
}
