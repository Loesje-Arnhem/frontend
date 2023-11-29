import { gql } from '@apollo/client/core'

export default gql`
  fragment page on Page {
    id
    databaseId
    title
  }
`
