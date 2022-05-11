import { gql } from '@apollo/client/core'

export default gql`
  fragment taxonomyDetails on Taxonomy {
    name
  }
`
