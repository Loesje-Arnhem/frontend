import { gql } from '@apollo/client/core'
import FeaturedImage from '../../Media/Fragments/FeaturedImage'
import posterBase from './PosterBase'

export default gql`
  fragment posters on Poster {
    ...posterBase
    uri
    slug
    featuredImage {
      ...featuredImage
    }
  }
  ${posterBase}
  ${FeaturedImage}
`
