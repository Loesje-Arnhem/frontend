import { useQuery } from '@vue/apollo-composable/dist'
import { reactive } from '@nuxtjs/composition-api'
import CustomerQuery from '~/graphql/Shop/Customer/Customer.gql'

export const useCustomer = () => {
  const { error, loading, onError, onResult } = useQuery(CustomerQuery)
  const customer = reactive({
    firstName: 'michiel',
    lastName: 'koning',
    email: 'mail@michielkoning.nl',
    billing: {
      street: 'test',
      houseNumber: 10,
      houseNumberAddition: 'B',
      city: 'Wageningen',
      company: '',
      country: 'NL',
      phone: '',
      postcode: '6708RC',
    },
  })

  // const customer = useResult(result)
  onResult(() => {
    // form.firstName = customer.value.id
  })

  return {
    customer,
    error,
    loading,
    onError,
  }
}
