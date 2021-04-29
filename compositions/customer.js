import { useQuery, useResult } from '@vue/apollo-composable/dist'
import { reactive } from '@nuxtjs/composition-api'
import CustomerQuery from '~/graphql/Shop/Customer/Customer.gql'

export const useCustomer = () => {
  const { result, error, loading, onError, onResult } = useQuery(CustomerQuery)
  const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    billing: {
      street: '',
      houseNumber: null,
      houseNumberAddition: '',
      city: '',
      company: '',
      country: '',
      phone: '',
      postcode: '',
    },
  })

  const customer = useResult(result)
  onResult(() => {
    form.firstName = customer.value.id
  })

  return {
    form,
    customer,
    error,
    loading,
    onError,
  }
}
