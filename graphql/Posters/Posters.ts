import { gql } from '@apollo/client/core'
import posterBase from './Fragments/PosterBase'

export default gql`
  query Posters(
    $first: Int
    $after: String
    $where: RootQueryToPosterConnectionWhereArgs
  ) {
    posters(first: $first, after: $after, where: $where) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          ...posterBase
          uri
          slug
          featuredImage {
            node {
              id
              medium: sourceUrl(size: MEDIUM)
              large: sourceUrl(size: LARGE)
            }
          }
        }
      }
    }
  }
  ${posterBase}
`
