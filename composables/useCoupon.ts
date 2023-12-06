import type { ErrorObject } from '@vuelidate/core'
import { updateCartCache } from '~/composables/useCart'
import { addCouponMutation, removeCouponMutation } from '~/graphql/coupon'

export const useAddCoupon = () => {
  const code = ref('kortenleding')
  const errors: Ref<ErrorObject[]> = ref([])

  const { mutate, loading, onError } = useMutation(addCouponMutation, () => ({
    variables: {
      // clientMutationId: v4(),
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
    mutate,
  }
}

export const useRemoveCoupon = () => {
  const errors = ref([])

  const { mutate, loading, onError } = useMutation(
    removeCouponMutation,
    () => ({
      update(cache, { data }) {
        updateCartCache(cache, data?.removeCoupons)
      },
    }),
  )
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })
  return {
    errors,
    loading,
    mutate,
  }
}
