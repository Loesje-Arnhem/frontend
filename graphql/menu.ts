import { gql } from '~/graphql/__generated__'

export const GetHeaderMenu = gql(`
  query GetHeaderMenu {
    menu(id: "header-menu-frontend", idType: LOCATION) {
      id
      menuItems(
        first: 99,
        where: {
          parentDatabaseId: 0
        }
      ) {
        edges {
          node {
            ...MenuItemWithChildren
          }
        }
      }
    }
    productCategories(where:{childless:false}) {
      edges {
        node {
          id
          name
          uri
        }
      }
    }
  }


`)

export const GetFooterMenu = gql(`
  query GetFooterMenu {
    menu(id: "footer-menu", idType: LOCATION) {
      id
      menuItems(
        first: 99,
        where: {
          parentDatabaseId: 0
        }
      ) {
        edges {
          node {
            ...MenuItem
          }
        }
      }
    }
  }
`)
