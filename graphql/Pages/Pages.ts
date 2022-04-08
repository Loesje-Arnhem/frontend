import { gql } from '@apollo/client/core'
import pageContent from './Fragments/PageContent'

export default gql`
  query Page($uri: ID!) {
    page(id: $uri, idType: URI) {
      ...pageContent
    }
  }
  ${pageContent}
`

export const GetPageById = gql`
  query Page($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      ...pageContent
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
