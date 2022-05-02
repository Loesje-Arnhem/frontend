import { IRelatedContent, IDetailsContent, IPageInfo } from '~/interfaces/INode'

export interface IRelatedPost extends IRelatedContent {
  date: string
}

export interface IRelatedPostNode {
  node: IRelatedPost
}

export interface IPostsBase {
  edges: IRelatedPostNode[]
}

export interface IPosts extends IPostsBase {
  pageInfo: IPageInfo
}

export interface IPost extends IDetailsContent {
  date: string
  relatedPosts: IPosts
}
