import { useQuery, useResult, useMutation } from '@vue/apollo-composable/dist'
import { ref, computed } from '@nuxtjs/composition-api'
import { v4 } from 'uuid'
import CartQuery from '~/graphql/Shop/Cart/Cart.gql'
import AddToCartQuery from '~/graphql/Shop/Cart/AddToCart.gql'
import UpdateItemQuantitiesQuery from '~/graphql/Shop/Cart/UpdateItemQuantities.gql'
import RemoveItemsFromCartQuery from '~/graphql/Shop/Cart/RemoveItemsFromCart.gql'
import ApplyCouponQuery from '~/graphql/Shop/Coupons/ApplyCoupon.gql'
import RemoveCouponsQuery from '~/graphql/Shop/Coupons/RemoveCoupons.gql'

export const updateCartCache = (cache, data) => {
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
  const { result, error, loading, onError } = useQuery(CartQuery, null, {
    // prefetch: true,
  })

  const cart = useResult(result)

  const totalProducts = computed(() => {
    if (!cart.value) {
      return 0
    }
    return cart.value.contents.nodes.reduce((num, item) => {
      return num + item.quantity
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

export const useAddToCart = (productId) => {
  const errors = ref([])
  const quantity = ref(1)

  const {
    mutate: addToCart,
    loading,
    onError,
    onDone,
  } = useMutation(AddToCartQuery, () => ({
    variables: {
      clientMutationId: v4(),
      productId,
      quantity: parseInt(quantity.value),
    },
    update(cache, { data }) {
      updateCartCache(cache, data?.addToCart)
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

export const useApplyCoupon = () => {
  const code = ref('faag9a3u')
  const errors = ref([])

  const {
    mutate: applyCoupon,
    loading,
    onError,
  } = useMutation(ApplyCouponQuery, () => ({
    variables: {
      clientMutationId: v4(),
      code: code.value,
    },
    update(cache, { data }) {
      updateCartCache(cache, data?.applyCoupon)
    },
  }))
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })
  return {
    errors,
    code,
    loading,
    applyCoupon,
  }
}

export const useRemoveCoupon = (code) => {
  const errors = ref([])

  const {
    mutate: removeCoupon,
    loading,
    onError,
  } = useMutation(RemoveCouponsQuery, () => ({
    variables: {
      clientMutationId: v4(),
      codes: [code],
    },
    update(cache, { data }) {
      updateCartCache(cache, data?.removeCoupons)
    },
  }))
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })
  return {
    errors,
    code,
    loading,
    removeCoupon,
  }
}
