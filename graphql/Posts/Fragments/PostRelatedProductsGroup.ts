import { gql } from '@apollo/client/core'
import {
  simpleProduct,
  variableProduct,
} from '../../Products/Fragments/ProductListItem'
export default gql`
  fragment postRelatedProductsGroup on Post_Relatedproductsgroup {
    title: relatedProductsTitle
    products: relatedProductsProducts {
      ... on Post_Relatedproductsgroup_relatedProductsProducts {
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
