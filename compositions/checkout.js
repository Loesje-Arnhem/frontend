import { useMutation } from '@vue/apollo-composable/dist'
import { ref, reactive } from '@nuxtjs/composition-api'
import { v4 } from 'uuid'
import CheckoutQuery from '~/graphql/Shop/Checkout/Checkout.gql'
import CartQuery from '~/graphql/Shop/Cart/Cart.gql'

export const useCheckout = () => {
  const errors = ref([])
  const paymentMethod = ref('cod')
  const shipToDifferentAddress = ref(true)
  const billing = reactive({
    address1: 'Bevrijdingsstraat',
    address2: '10',
    city: 'Wageningen',
    company: 'Bedrijf',
    country: 'NL',
    email: 'mail@michielkoning.nl',
    firstName: 'michiel billing',
    lastName: 'koning',
    postcode: '6708AA',
  })
  const shipping = reactive({
    address1: 'Oudlaan',
    address2: '35',
    city: 'Wageningen',
    company: 'Bedrijf',
    country: 'NL',
    email: 'mail@michielkoning.nl',
    firstName: 'michiel shipping',
    lastName: 'koning',
    postcode: '6708RC',
  })
  const { mutate: checkout, loading, onError } = useMutation(
    CheckoutQuery,
    () => ({
      variables: {
        clientMutationId: v4(),
        paymentMethod: paymentMethod.value,
        shipToDifferentAddress: shipToDifferentAddress.value,
        billing,
        shipping,
      },
      refetchQueries: [{ query: CartQuery }],
    }),
  )
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })
  return {
    shipping,
    billing,
    shipToDifferentAddress,
    paymentMethod,
    errors,
    loading,
    checkout,
  }
}
