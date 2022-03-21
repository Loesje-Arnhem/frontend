export interface IContent {
  id: string
  databaseId: number
  title: string
}

export interface IRelatedContent extends IContent {
  excerpt: string
  uri: string
}
