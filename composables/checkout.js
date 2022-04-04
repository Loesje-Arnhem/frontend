import { useMutation } from '@vue/apollo-composable'
import { ref, reactive } from '@nuxtjs/composition-api'
import { v4 } from 'uuid'
import CheckoutQuery from '~/graphql/Shop/Checkout/Checkout.gql'
import CartQuery from '~/graphql/Shop/Cart/Cart.gql'
import useNewsletter from '~/composables/newsletter'

export const useCheckout = () => {
  const errors = ref([])
  const paymentMethod = ref('cod')
  const shipToDifferentAddress = ref(false)
  const addToNewsletter = ref(false)
  const { addToNewsletter: submitToNewsletter, form: newsletterForm } =
    useNewsletter()
  const billing = reactive({
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    postcode: '',
  })
  const shipping = reactive({
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    postcode: '',
  })
  const {
    mutate: checkout,
    loading,
    onError,
    onDone,
  } = useMutation(CheckoutQuery, () => ({
    variables: {
      clientMutationId: v4(),
      paymentMethod: paymentMethod.value,
      shipToDifferentAddress: shipToDifferentAddress.value,
      billing,
      shipping,
    },
    refetchQueries: [{ query: CartQuery }],
  }))
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })

  // submits to the newsletter when checkout succeeds
  onDone(() => {
    if (!addToNewsletter.value) {
      return
    }
    newsletterForm.email = billing.email
    newsletterForm.firstName = billing.firstName
    newsletterForm.lastName = billing.lastName
    newsletterForm.list = 'products'
    submitToNewsletter()
  })
  return {
    shipping,
    billing,
    shipToDifferentAddress,
    paymentMethod,
    errors,
    loading,
    checkout,
    addToNewsletter,
  }
}
