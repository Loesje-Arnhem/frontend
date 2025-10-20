import type {
  IRelatedContent,
  IDetailsContent,
  IPageInfo,
} from '~/types/INode'

export type IRelatedPost = IRelatedContent & {
  date: string
}

export type IRelatedPostNode = {
  node: IRelatedPost
}

export type IPostsBase = {
  edges: IRelatedPostNode[]
}

export type IPosts = IPostsBase & {
  pageInfo: IPageInfo
}

export type IPost = IDetailsContent & {
  date: string
  relatedPosts: IPosts
}
