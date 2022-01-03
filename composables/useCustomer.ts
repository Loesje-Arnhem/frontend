import { useQuery, useResult } from '@vue/apollo-composable/dist'
import CustomerQuery from '~/graphql/Customer/Customer.gql'

export default () => {
  const { error, loading, onError, onResult, result } = useQuery(CustomerQuery)
  const customer = useResult(result)

  return {
    onResult,
    customer,
    error,
    loading,
    onError,
  }
}
