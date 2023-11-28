import { gql } from '~/types/__generated__'

export default gql(`
  mutation AddToCart($productId: Int!, $quantity: Int) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cart {
        ...cartFragment

    }
  }
`)
