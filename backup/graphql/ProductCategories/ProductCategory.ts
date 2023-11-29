import { gql } from '@apollo/client/core'
import { taxonomySeo } from '../Fragments/Seo'
import {
  simpleProduct,
  variableProduct,
} from './../Products/Fragments/ProductListItem'
import { TOTAL_PRODUCT_CATEGORIES } from './../../data/generate'

const productCategory = gql`
  fragment productCategory on ProductCategory {
    id
    databaseId
    title: name
    content: description
    seo {
      ...taxonomySeo
    }
    products(
      first: 99
      where: {
        stockStatus: [IN_STOCK]
        orderby: { field: MENU_ORDER, order: ASC }
      }
    ) {
      edges {
        node {
          id
          slug
          databaseId
          title: name

          ... on SimpleProduct {
            ...simpleProduct
          }
          ... on VariableProduct {
            ...variableProduct
          }
        }
      }
    }
  }
  ${simpleProduct}
  ${variableProduct}
  ${taxonomySeo}
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
