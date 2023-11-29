import { gql } from '@apollo/client/core'
export default gql`
  fragment postBase on Post {
    id
    title
    databaseId
    date
  }
`
