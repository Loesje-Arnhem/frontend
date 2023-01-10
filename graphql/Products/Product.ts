import { gql } from '@apollo/client/core'
import seo from '../Fragments/Seo'
import featuredImage, { mediaItem } from '../Media/Fragments/FeaturedImage'
import { simpleProduct, variableProduct } from './Fragments/ProductListItem'

export default gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      title: name
      ... on SimpleProduct {
        ...simpleProduct
        seo {
          ...seo
        }
        stockStatus
      }
      ... on VariableProduct {
        ...variableProduct
        seo {
          ...seo
        }
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
        edges {
          node {
            ...mediaItem
          }
        }
      }
      related(first: 12, where: { stockStatus: [IN_STOCK] }) {
        edges {
          node {
            slug
            id
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
  }
  ${featuredImage}
  ${mediaItem}
  ${variableProduct}
  ${simpleProduct}
  ${seo}
`
