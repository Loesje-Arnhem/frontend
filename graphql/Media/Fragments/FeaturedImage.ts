import { gql } from '@apollo/client/core'

export default gql`
  fragment featuredImage on NodeWithFeaturedImageToMediaItemConnectionEdge {
    node {
      id
      srcSet
      src: sourceUrl(size: LARGE)
      mediaDetails {
        width
        height
      }
    }
  }
`
