import { gql } from '@apollo/client/core'

export const mediaItem = gql`
  fragment mediaItem on MediaItem {
    id
    srcSet
    src: mediaItemUrl
    mediaDetails {
      width
      height
    }
  }
`

export default gql`
  fragment featuredImage on NodeWithFeaturedImageToMediaItemConnectionEdge {
    node {
      ...mediaItem
    }
  }
  ${mediaItem}
`
