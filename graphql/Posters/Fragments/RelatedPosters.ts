import { gql } from '@apollo/client/core'

export default gql`
  fragment relatedPosters on ContentNodeToPosterConnection {
    edges {
      node {
        id
        databaseId
        title
        uri
        featuredImage {
          node {
            id
            medium: sourceUrl(size: MEDIUM)
          }
        }
      }
    }
  }
`
