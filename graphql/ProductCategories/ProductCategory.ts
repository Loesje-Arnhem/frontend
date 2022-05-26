import { gql } from '@apollo/client/core'
import product from './../Products/Fragments/ProductListItem'
import { TOTAL_PRODUCT_CATEGORIES } from './../../data/generate'

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

export const GetAllProductCategories = gql`
  query ProductCategories($after: String) {
    productCategories(
      where: { hideEmpty: true }
      first: ${TOTAL_PRODUCT_CATEGORIES},
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
