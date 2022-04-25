import { gql } from '@apollo/client/core'

export default gql`
  fragment relatedPosts on Post {
    relatedPosts {
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
`
