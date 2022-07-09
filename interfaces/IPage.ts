import { IDetailsContent, IRelatedContent } from './INode'

export interface IRelatedPage extends IRelatedContent {}

export interface IRelatedPageNode {
  node: IRelatedPage
}

export interface IRelatedPages {
  edges: IRelatedPageNode[]
}

export interface IPage extends IDetailsContent {
  content: string
  relatedPages: IRelatedPages
}
