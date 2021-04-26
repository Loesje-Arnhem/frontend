import { useQuery, useResult, useMutation } from '@vue/apollo-composable/dist'

import CartQuery from '~/graphql/Shop/Cart/Cart.gql'
import AddToCartQuery from '~/graphql/Shop/Cart/AddToCart.gql'
import ClearCartQuery from '~/graphql/Shop/Cart/ClearCart.gql'

export const useCart = () => {
  const { result, error, loading, onError, refetch } = useQuery(CartQuery)

  const cart = useResult(result)

  return {
    refetch,
    cart,
    error,
    loading,
    onError,
  }
}

export const useAddToCart = () => {
  const { mutate: addToCart, onDone } = useMutation(AddToCartQuery)
  return {
    onDone,
    addToCart,
  }
}

export const useClearCart = () => {
  const { mutate: clearCart, onDone } = useMutation(ClearCartQuery)
  return {
    onDone,
    clearCart,
  }
}
