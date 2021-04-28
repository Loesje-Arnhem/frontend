import { useQuery, useResult, useMutation } from '@vue/apollo-composable/dist'
import { ref } from '@nuxtjs/composition-api'
import { v4 } from 'uuid'
import CartQuery from '~/graphql/Shop/Cart/Cart.gql'
import AddToCartQuery from '~/graphql/Shop/Cart/AddToCart.gql'
import UpdateItemQuantitiesQuery from '~/graphql/Shop/Cart/UpdateItemQuantities.gql'
import RemoveItemsFromCartQuery from '~/graphql/Shop/Cart/RemoveItemsFromCart.gql'

const updateCartCache = (cache, data) => {
  // https://www.apollographql.com/blog/when-to-use-refetch-queries-in-apollo-client/
  // We use an update function here to write the
  // new value of the Cart query.
  const cart = data?.cart

  if (cart) {
    cache.writeQuery({
      query: CartQuery,
      data: {
        cart,
      },
    })
  }
}

export const useCart = () => {
  const { result, error, loading, onError } = useQuery(CartQuery)

  const cart = useResult(result)

  return {
    cart,
    error,
    loading,
    onError,
  }
}

export const useAddToCart = (productId) => {
  const errors = ref([])
  const quantity = ref(1)

  const { mutate: addToCart, loading, onError } = useMutation(
    AddToCartQuery,
    () => ({
      variables: {
        clientMutationId: v4(),
        productId,
        quantity: parseInt(quantity.value),
      },
      update(cache, { data }) {
        updateCartCache(cache, data?.addToCart)
      },
    }),
  )

  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })
  return {
    quantity,
    errors,
    loading,
    addToCart,
  }
}

export const useRemoveItemsFromCart = (product) => {
  const { mutate: removeItemsFromCart, loading } = useMutation(
    RemoveItemsFromCartQuery,
    () => ({
      variables: {
        clientMutationId: v4(),
        keys: [product.key],
      },
      update(cache, { data }) {
        updateCartCache(cache, data?.removeItemsFromCart)
      },
    }),
  )

  return {
    loading,
    removeItemsFromCart,
  }
}

export const useUpdateItemQuantities = (product) => {
  const quantity = ref(product.quantity)
  const { mutate: updateItemQuantities, loading } = useMutation(
    UpdateItemQuantitiesQuery,
    () => ({
      variables: {
        clientMutationId: v4(),
        items: [
          {
            key: product.key,
            quantity: parseInt(quantity.value),
          },
        ],
      },
      update(cache, { data }) {
        updateCartCache(cache, data?.updateItemQuantities)
      },
    }),
  )
  return {
    quantity,
    loading,
    updateItemQuantities,
  }
}
