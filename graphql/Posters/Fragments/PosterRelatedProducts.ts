import { gql } from '@apollo/client/core'
import product from './../../Products/Fragments/ProductListItem'

export default gql`
  fragment relatedProducts on Poster_Relatedproductsgroup {
    title: relatedProductsTitle
    products: relatedProductsProducts {
      product {
        ...product
      }
    }
  }
  ${product}
`
