export interface IContent {
  id: string
  databaseId: string
  title: string
}

export interface IRelatedContent extends IContent {
  excerpt: string
  uri: string
}
