import { gql } from '@apollo/client/core'
import {
  simpleProduct,
  variableProduct,
} from '../../Products/Fragments/ProductListItem'

export default gql`
  fragment posterRelatedProducts on Poster_Relatedproductsgroup {
    title: relatedProductsTitle
    products: relatedProductsProducts {
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
  ${simpleProduct}
  ${variableProduct}
`
