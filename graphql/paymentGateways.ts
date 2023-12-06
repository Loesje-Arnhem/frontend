import { gql } from '~/graphql/__generated__'

export const getPaymentGatewaysQuery = gql(`
  query getPaymentGatewaysQuery {
    paymentGateways {
      edges {
        node {
          id
          title
          description
          icon
        }
      }
    }
  }
`)
