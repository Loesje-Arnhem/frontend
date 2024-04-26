import { type IDetailsContent, type IRelatedContent } from './INode'

export type IRelatedPage = IRelatedContent

export type IRelatedPageNode = {
  node: IRelatedPage
}

export type IRelatedPages = {
  edges: IRelatedPageNode[]
}

export type IPage = IDetailsContent & {
  content: string
  relatedPages: IRelatedPages
}
