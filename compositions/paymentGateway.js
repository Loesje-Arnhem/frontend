import { useQuery, useResult } from '@vue/apollo-composable/dist'
import PaymentGatewaysQuery from '~/graphql/Shop/PaymentGateways.gql'

export const usePaymentGateways = () => {
  const { result, error, loading, onError } = useQuery(PaymentGatewaysQuery)

  const paymentGateways = useResult(result)

  return {
    paymentGateways,
    error,
    loading,
    onError,
  }
}
