import { gql } from '@apollo/client/core'

const productCategory = gql`
  fragment productCategory on ProductCategory {
    id
    databaseId
    name
    description
    products {
      edges {
        node {
          ... on SimpleProduct {
            slug
            id
            databaseId
            name
            image {
              id
              altText
              thumbnail: sourceUrl(size: THUMBNAIL)
              medium: sourceUrl(size: MEDIUM)
              mediumLarge: sourceUrl(size: MEDIUM_LARGE)
            }
          }
        }
      }
    }
  }
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
  query ProductCategories($slug: ID!) {
    productCategories {
      edges {
        node {
          ...productCategory
        }
      }
    }
  }
  ${productCategory}
`
