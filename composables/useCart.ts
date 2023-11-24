import type { ApolloCache } from '@apollo/client'
import { getCartQuery, addToCartMutation } from '~/graphql/cart'
import type { GetCartQuery } from '~/types/__generated__/graphql'

export const updateCartCache = (
  cache: ApolloCache<typeof getCartQuery>,
  data: GetCartQuery,
) => {
  // https://www.apollographql.com/blog/when-to-use-refetch-queries-in-apollo-client/
  // We use an update function here to write the
  // new value of the Cart query.
  const cart = data?.cart

  if (cart) {
    cache.writeQuery({
      query: getCartQuery,
      data,
    })
  }
}

export const useCart = () => {
  const { result, error, loading, onError } = useQuery(getCartQuery)

  const cart = computed(() => {
    const items =
      result.value?.cart?.contents?.nodes.filter((item) => {
        return item !== undefined
      }) ?? []

    return {
      ...result.value?.cart,
      contents: {
        nodes: items,
      },
    }
  })

  const totalProducts = computed(() => {
    if (!cart.value) {
      return 0
    }
    return cart.value.contents?.nodes.reduce((num, item) => {
      return num + (item.quantity ?? 0)
    }, 0)
  })

  return {
    totalProducts,
    cart,
    error,
    loading,
    onError,
  }
}

export const useAddToCart = (productId: number) => {
  const errors = ref<string[]>([])
  const quantity = ref(1)

  const {
    mutate: addToCart,
    loading,
    onError,
    onDone,
  } = useMutation(addToCartMutation, () => ({
    variables: {
      productId,
      quantity: quantity.value,
    },
    update(cache, { data }) {
      if (data?.addToCart) {
        updateCartCache(cache, data.addToCart)
      }
    },
  }))

  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })
  return {
    quantity,
    errors,
    loading,
    addToCart,
    onDone,
  }
}
