import { IRelatedContent, IDetailsContent, IPageInfo } from '~/interfaces/INode'

export interface IRelatedPost extends IRelatedContent {
  date: string
}

export interface IPosts {
  pageInfo: IPageInfo
  edges: {
    nodes: IRelatedPost[]
  }
}

export interface IPost extends IDetailsContent {
  date: string
  relatedPosts: IPosts
}
