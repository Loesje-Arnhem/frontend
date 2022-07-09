import { gql } from '@apollo/client/core'

export default gql`
  query User {
    customer {
      id
      firstName
      lastName
      email
    }
  }
`
