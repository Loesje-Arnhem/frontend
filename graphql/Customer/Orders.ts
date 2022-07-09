import { gql } from '@apollo/client/core'

export default gql`
  query GetOrders {
    customer {
      orders {
        edges {
          node {
            id
            subtotal
            total
            shippingTotal
            orderKey
            status
            orderNumber
            date
            lineItems {
              edges {
                node {
                  quantity
                }
              }
            }
          }
        }
      }
    }
  }
`
