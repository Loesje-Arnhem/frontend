import { gql } from '@apollo/client/core'

export default gql`
  query GET_PAYMENT_GATEWAYS {
    paymentGateways(where: { all: false }) {
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
`
