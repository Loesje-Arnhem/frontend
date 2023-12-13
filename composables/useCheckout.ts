import {
  CountriesEnum,
  type CustomerAddressInput,
} from '~/graphql/__generated__/graphql'
import { submitCheckoutMutation } from '~/graphql/checkout'
import { getCartQuery } from '~/graphql/cart'

export const useCheckout = () => {
  const errors = ref([])
  const paymentMethod = ref('cod')
  const shipToDifferentAddress = ref(false)
  const addToNewsletter = ref(false)
  const billing = reactive({
    street: '',
    houseNumber: '',
    city: '',
    company: '',
    country: CountriesEnum.Nl,
    email: '',
    firstName: '',
    lastName: '',
    postcode: '',
  })

  const shipping = reactive<CustomerAddressInput>({
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: CountriesEnum.Nl,
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
  } = useMutation(submitCheckoutMutation, () => ({
    variables: {
      paymentMethod: paymentMethod.value,
      shipToDifferentAddress: shipToDifferentAddress.value,
      billing,
      shipping,
    },
    refetchQueries: [{ query: getCartQuery }],
  }))
  onError(({ graphQLErrors }) => {
    errors.value = graphQLErrors.map((err) => err.message)
  })

  // submits to the newsletter when checkout succeeds
  onDone(() => {
    if (!addToNewsletter.value) {
      return
    }
    // newsletterForm.email = billing.email
    // newsletterForm.firstName = billing.firstName
    // newsletterForm.lastName = billing.lastName
    // newsletterForm.list = NewsletterList.Products

    // submitToNewsletter()
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
