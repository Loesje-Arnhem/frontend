import { gql } from '@apollo/client/core'
import product from '../../Products/Fragments/ProductListItem'

export default gql`
  fragment pageRelatedProducts on Page_Relatedproductsgroup {
    title: relatedProductsTitle
    products: relatedProductsProducts {
      ... on Page_Relatedproductsgroup_relatedProductsProducts {
        product {
          ...product
        }
      }
    }
  }
  ${product}
`
