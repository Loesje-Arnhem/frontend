import { gql } from '~/types/__generated__'

export const productCategory = gql(`
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
          ...Product
        }
      }
    }
  }
`)

export const categoryFields = gql(`
  fragment categoryFields on ProductCategory {
    id
    name
    uri
    menuOrder
  }
`)
