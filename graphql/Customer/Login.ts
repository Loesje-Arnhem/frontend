import { gql } from '@apollo/client/core'

export default gql`
  mutation LOGIN($input: LoginInput!) {
    login(input: $input) {
      authToken
      refreshToken
    }
  }
`
