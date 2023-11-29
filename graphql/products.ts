import { gql } from '~/graphql/__generated__'

export const GetProduct = gql(`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ...ProductDetails
      seo {
        ...seo
      }

      # galleryImages {
      #   edges {
      #     node {
      #       ...mediaItem
      #     }
      #   }
      # }

      related(first: 12, where: { stockStatus: [IN_STOCK] }) {
        edges {
          node {
            databaseId
          }
        }
      }
    }
  }
`)

export const GetProducts = gql(`
  query GetProducts($categoryId: Int, $featured: Boolean, $include: [Int]) {
    products(
      where: {
        featured: $featured
        include: $include
        categoryId: $categoryId
        stockStatus: [IN_STOCK]
        orderby: { field: MENU_ORDER, order: ASC }
      }
      first: 99
    ) {
      edges {
        node {
          ...Product
        }
      }
    }
  }
`)
