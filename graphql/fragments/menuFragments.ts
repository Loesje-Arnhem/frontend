import { gql } from '~/types/__generated__'

export const MenuItem = gql(`fragment MenuItem on MenuItem {
  id
  uri
  label
}
`)

export const MenuItemWithChildren =
  gql(`fragment MenuItemWithChildren on MenuItem {
  ...MenuItem
  childItems {
    edges {
      node {
        ...MenuItem
      }
    }
  }
}
`)
