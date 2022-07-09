import { gql } from '@apollo/client/core'

export default gql`
  fragment sourceDetails on Source {
    id
    databaseId
    name
    taxonomy {
      node {
        name
      }
    }
  }
`
