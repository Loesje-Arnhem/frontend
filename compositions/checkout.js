import { useMutation } from '@vue/apollo-composable/dist'
import { ref } from '@nuxtjs/composition-api'
import { v4 } from 'uuid'
import CheckoutQuery from '~/graphql/Shop/Checkout/Checkout.gql'

export const useCheckout = () => {
  const errors = ref([])

  const { mutate: checkout, loading, onError } = useMutation(
    CheckoutQuery,
    () => ({
      variables: {
        clientMutationId: v4(),
      },
    }),
  )
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })
  return {
    errors,
    loading,
    checkout,
  }
}
