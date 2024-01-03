import {
  CountriesEnum,
  type CustomerAddressInput,
} from '~/graphql/__generated__/graphql'
import { submitCheckoutMutation } from '~/graphql/checkout'
import { getCartQuery } from '~/graphql/cart'
import { useVuelidate } from '@vuelidate/core'

export const useCheckout = () => {
  const errors = ref<string[]>([])
  const paymentMethod = ref('cod')
  const shipToDifferentAddress = ref(false)
  const addToNewsletter = ref(false)
  const billing = reactive({
    street: '',
    houseNumber: '',
    houseNumberSuffix: '',
    city: '',
    company: '',
    country: CountriesEnum.Nl,
    email: '',
    firstName: '',
    lastName: '',
    postcode: '',
  })

  const shipping = reactive({
    street: '',
    houseNumber: '',
    houseNumberSuffix: '',
    city: '',
    company: '',
    country: CountriesEnum.Nl,
    email: '',
    firstName: '',
    lastName: '',
    postcode: '',
  })
  const { mutate, loading, onError, onDone } = useMutation(
    submitCheckoutMutation,
    () => ({
      variables: {
        paymentMethod: paymentMethod.value,
        shipToDifferentAddress: shipToDifferentAddress.value,
        billing,
        shipping,
      },
      refetchQueries: [{ query: getCartQuery }],
    }),
  )
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
  const v$ = useVuelidate()

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
      return
    }

    await mutate({ billing })
  }
  return {
    shipping,
    billing,
    shipToDifferentAddress,
    paymentMethod,
    errors,
    loading,
    submit,
    addToNewsletter,
  }
}
