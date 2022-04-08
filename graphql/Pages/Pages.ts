import { gql } from '@apollo/client/core'
import pageContent from './Fragments/PageContent'
import { homePageId } from './../../data/pages'

export default gql`
  query PageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      ...pageContent
    }
  }
  ${pageContent}
`

export const GetPageById = gql`
  query GetPageById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      ...pageContent
    }
  }
  ${pageContent}
`

export const GetPageByHome = gql`
  query GetPageByHome {
    page(id: ${homePageId}, idType: DATABASE_ID) {
      ...pageContent
    }
    posts(first: 3) {
      edges {
        node {
          id
          title
          databaseId
          date
          excerpt
          uri
        }
      }
    }
  }
  ${pageContent}
`

export const GetPages = gql`
  query Pages {
    pages(first: 99) {
      edges {
        node {
          ...pageContent
          uri
        }
      }
    }
  }
  ${pageContent}
`
