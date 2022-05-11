import { gql } from '@apollo/client/core'

export default gql`
  fragment posterBase on Poster {
    id
    databaseId
    title
  }
`
