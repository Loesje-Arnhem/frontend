import { gql } from '~/graphql/__generated__'

export const MediaItem = gql(`
  fragment MediaItem on MediaItem {
    id
    srcSet
    alt: altText
    src: mediaItemUrl
    mediaDetails {
      width
      height
    }
  }
`)

export const FeaturedImage = gql(`
  fragment FeaturedImage on NodeWithFeaturedImageToMediaItemConnectionEdge {
    node {
      ...MediaItem
    }
  }
`)
