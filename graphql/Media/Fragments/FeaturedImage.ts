import { gql } from '@apollo/client/core'

export default gql`
  fragment featuredImage on NodeWithFeaturedImageToMediaItemConnectionEdge {
    node {
      id
      mediaItemUrl
      mediaDetails {
        width
        height
      }
    }
  }
`
