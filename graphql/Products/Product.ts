import { gql } from '@apollo/client/core'
import featuredImage, { mediaItem } from '../Media/Fragments/FeaturedImage'

export default gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      ... on SimpleProduct {
        id
        regularPrice
        price
        salePrice
        stockStatus
        featuredImage {
          ...featuredImage
        }
      }
      ... on VariableProduct {
        id
        regularPrice
        price
        salePrice
        stockStatus
        featuredImage {
          ...featuredImage
        }
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
        edges {
          node {
            ...mediaItem
          }
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
  ${featuredImage}
  ${mediaItem}
`
