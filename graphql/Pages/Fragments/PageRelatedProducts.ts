import { gql } from '@apollo/client/core'
import {
  simpleProduct,
  variableProduct,
} from '../../Products/Fragments/ProductListItem'

export default gql`
  fragment pageRelatedProducts on Page_Relatedproductsgroup {
    title: relatedProductsTitle
    products: relatedProductsProducts {
      ... on Page_Relatedproductsgroup_relatedProductsProducts {
        product {
          ... on SimpleProduct {
            slug
            id
            databaseId
            title: name
            ...simpleProduct
          }
          ... on VariableProduct {
            slug
            id
            databaseId
            title: name
            ...variableProduct
          }
        }
      }
    }
  }
  ${simpleProduct}
  ${variableProduct}
`
