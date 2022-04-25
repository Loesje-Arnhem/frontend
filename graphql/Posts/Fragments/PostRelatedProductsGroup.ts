import { gql } from '@apollo/client/core'
import product from './../../Products/Fragments/ProductListItem'

export default gql`
  fragment postRelatedProductsGroup on Post_Relatedproductsgroup {
    title: relatedProductsTitle
    products: relatedProductsProducts {
      ... on Post_Relatedproductsgroup_relatedProductsProducts {
        product {
          ...product
        }
      }
    }
  }
  ${product}
`
