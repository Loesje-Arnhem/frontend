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
