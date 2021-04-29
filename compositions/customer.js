import { useQuery, useResult } from '@vue/apollo-composable/dist'
import { reactive } from '@nuxtjs/composition-api'
import CustomerQuery from '~/graphql/Shop/Customer/Customer.gql'

export const useCustomer = () => {
  const { result, error, loading, onError, onResult } = useQuery(CustomerQuery)
  const form = reactive({
    firstName: 'michiel',
    lastName: 'koning',
    email: 'mail@michielkoning.nl',
    billing: {
      street: 'test',
      houseNumber: null,
      houseNumberAddition: '10',
      city: 'wageningen',
      company: '',
      country: 'Nederland',
      phone: '',
      postcode: '6708RC',
    },
  })

  const customer = useResult(result)
  onResult(() => {
    // form.firstName = customer.value.id
  })

  return {
    form,
    customer,
    error,
    loading,
    onError,
  }
}
