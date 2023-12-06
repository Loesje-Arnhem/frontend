import { gql } from '~/graphql/__generated__'

export const getCartQuery = gql(`
  query GetCart {
    cart {
      ...cartFragment
    }
  }
`)

export const addToCartMutation = gql(`
  mutation AddToCart($productId: Int!, $quantity: Int) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cart {
        ...cartFragment
      }
    }
  }
`)

export const removeItemsFromCartMutation = gql(`
  mutation RemoveItemsFromCart($keys: [ID]) {
    removeItemsFromCart(input: { keys: $keys }) {
      cart {
        ...cartFragment
      }
    }
  }
`)

export const updateItemQuantitiesMutation = gql(`
  mutation UpdateItemQuantities($items: [CartItemQuantityInput]) {
    updateItemQuantities(input: { items: $items }) {
      cart {
        ...cartFragment
      }
    }
  }
`)
