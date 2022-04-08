import { gql } from '@apollo/client/core'

export default gql`
  fragment relatedProductsPageGroup on Page_Relatedproductsgroup {
    title: relatedProductsTitle
    products: relatedProductsProducts {
      product {
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
`
