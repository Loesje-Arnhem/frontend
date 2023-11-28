import { gql } from '~/types/__generated__'

export const GetProductCategory = gql(`
  query GetProductCategory($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      ...productCategory
    }
  }
`)

export const GetProductCategories = gql(`
  query GetProductCategories {
    productCategories(
      where: { hideEmpty: true, orderby: TERM_ORDER, order: ASC }
      first: 99
    ) {
      edges {
        node {
          ...categoryFields
          parentDatabaseId
          children {
            edges {
              node {
                ...categoryFields
              }
            }
          }
        }
      }
    }
  }
`)
