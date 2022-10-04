import { gql } from '@apollo/client/core'

export default gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
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
      ... on SimpleProduct {
        id
        regularPrice
        price
        salePrice
        stockStatus
      }
      ... on VariableProduct {
        id
        regularPrice
        price
        salePrice
        stockStatus
      }

      shortDescription
      description
      globalAttributes {
        nodes {
          id
          name
          slug
          variation
          position
          scope
          attributeId
          visible
          terms {
            nodes {
              id
              databaseId
              name
              slug
              count
            }
          }
        }
      }
      galleryImages {
        nodes {
          id
          altText
          thumbnail: sourceUrl(size: THUMBNAIL)
          medium: sourceUrl(size: MEDIUM)
          mediumLarge: sourceUrl(size: MEDIUM_LARGE)
        }
      }
      related {
        edges {
          node {
            databaseId
          }
        }
      }
    }
  }
`
