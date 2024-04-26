export type ITag = {
  node: {
    id: string
    databaseId: number
    name: string
    taxonomy: {
      node: {
        name: string
      }
    }
  }
}

export type ITags = {
  edges: ITag
}
