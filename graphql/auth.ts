import { gql } from '~/graphql/__generated__'

export const LoginMutation = gql(`
  mutation Login($username: String!, $password: String!) {
    login(
      input: {
        username: $username,
        password: $password
      }
    ) {
      authToken
      clientMutationId
      refreshToken
      sessionToken
      user {
        id
        firstName
      }
    }
  }
`)

export const UserQuery = gql(`
  query User {
    customer {
      id
      firstName
      lastName
      email
      billing {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
    }
  }
`)
