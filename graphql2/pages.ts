import { gql } from '~/types/__generated__'

export const GetPageByUri = gql(`query GetPageByUri($uri: ID!) {
  page(id: $uri, idType: URI) {
    ...PageDetails
  }
}
`)

export const GetPageByID = gql(`query GetPageByID($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    ...PageDetails
  }
}
`)

export const GetPageHome = gql(`query GetPageHome($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    ...PageDetails
  }
  posts(first: 3, where: { hasPassword: false }) {
    ...PostListItems
  }
}
`)

export const GetPageShop = gql(`query GetPageShop($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    ...PageDetails
  }
}
`)
