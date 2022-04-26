import { gql } from '@apollo/client/core'
import postListItem from './PostListItem'

export default gql`
  fragment relatedPosts on PostToPostConnection {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ...postListItem
      }
    }
  }
  ${postListItem}
`
