import { gql } from '@apollo/client/core'
import featuredImage from '../../Media/Fragments/FeaturedImage'

export const simpleProduct = gql`
  fragment simpleProduct on SimpleProduct {
    regularPrice
    price
    salePrice
    featuredImage {
      ...featuredImage
    }
  }
  ${featuredImage}
`

export const variableProduct = gql`
  fragment variableProduct on VariableProduct {
    regularPrice
    price
    salePrice
    featuredImage {
      ...featuredImage
    }
  }
  ${featuredImage}
`
