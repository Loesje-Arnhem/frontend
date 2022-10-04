import { gql } from '@apollo/client/core'
import featuredImage from '../../Media/Fragments/FeaturedImage'

export default gql`
  fragment product on SimpleProduct {
    slug
    id
    databaseId
    name
    regularPrice
    price
    salePrice
    featuredImage {
      ...featuredImage
    }
  }
  ${featuredImage}
`
