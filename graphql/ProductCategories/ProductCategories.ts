import { gql } from '@apollo/client/core'

const categoryFields = gql`
  fragment categoryFields on ProductCategory {
    id
    name
    uri
    menuOrder
  }
`

export default gql`
  query GET_PRODUCT_CATEGORIES {
    productCategories(
      where: { hideEmpty: true, orderby: TERM_ORDER }
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
  ${categoryFields}
`
