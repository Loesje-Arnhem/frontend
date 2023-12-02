import { gql } from '~/graphql/__generated__'

export const submitCheckoutMutation = gql(`
    mutation SubmitCheckoutMutation(
      $billing: CustomerAddressInput
      $shipping: CustomerAddressInput
      $paymentMethod: String
      $shipToDifferentAddress: Boolean
  ) {
    checkout(
      input: {
        paymentMethod: $paymentMethod
        billing: $billing
        shipping: $shipping
        shipToDifferentAddress: $shipToDifferentAddress
      }
    ) {
      clientMutationId
      redirect
      order {
        id
      }
      result
    }
  }
`)
