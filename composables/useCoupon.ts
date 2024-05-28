import type { ErrorObject } from '@vuelidate/core'
import { updateCartCache } from '~/composables/useCart'
import { addCouponMutation, removeCouponMutation } from '~/graphql/coupon'

export const useAddCoupon = () => {
  const formData = reactive({
    code: 'kortenleding',
  })
  const errors: Ref<ErrorObject[]> = ref([])

  const { mutate, loading, onError } = useMutation(addCouponMutation, () => ({
    variables: {
      // clientMutationId: v4(),
      code: formData.code,
    },
    update(cache, { data }) {
      updateCartCache(cache, data?.applyCoupon)
    },
  }))
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map(err => err.message)
  })

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
      return
    }

    await mutate({ code: formData.code })
  }

  return {
    errors,
    formData,
    loading,
    submit,
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
    errors.value = graphQLErrors.map(err => err.message)
  })
  return {
    errors,
    loading,
    mutate,
  }
}
