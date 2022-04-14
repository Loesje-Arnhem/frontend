import { gql } from '@apollo/client/core'
import product from './../Products/Fragments/ProductListItem'

const productCategory = gql`
  fragment productCategory on ProductCategory {
    id
    databaseId
    name
    description
    products(first: 99) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${product}
`

export default gql`
  query ProductCategory($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      ...productCategory
    }
  }
  ${productCategory}
`

export const GetProductCategories = gql`
  query ProductCategories {
    productCategories(where: { hideEmpty: true }, first: 99) {
      edges {
        node {
          ...productCategory
          uri
        }
      }
    }
  }
  ${productCategory}
`
