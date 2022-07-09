export interface ITag {
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

export interface ITags {
  edges: ITag
}
