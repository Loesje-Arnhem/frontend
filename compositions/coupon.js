import { useMutation } from '@vue/apollo-composable/dist'
import { ref } from '@nuxtjs/composition-api'
import { v4 } from 'uuid'
import { updateCartCache } from '~/compositions/cart'
import ApplyCouponQuery from '~/graphql/Shop/Coupons/ApplyCoupon.gql'
import RemoveCouponsQuery from '~/graphql/Shop/Coupons/RemoveCoupons.gql'

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
