import { gql } from '@apollo/client/core'
import product from './../../Products/Fragments/ProductListItem'

export default gql`
  fragment relatedProductsPageGroup on Page_Relatedproductsgroup {
    title: relatedProductsTitle
    products: relatedProductsProducts {
      product {
        ...product
      }
    }
  }
  ${product}
`
