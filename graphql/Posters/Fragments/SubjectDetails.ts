import { gql } from '@apollo/client/core'

export default gql`
  fragment subjectDetails on Subject {
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
