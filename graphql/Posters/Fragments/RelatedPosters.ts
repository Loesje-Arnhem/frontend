import { gql } from '@apollo/client/core'
import posters from './Posters'

export default gql`
  fragment relatedPosters on ContentNodeToPosterConnection {
    edges {
      node {
        ...posters
      }
    }
  }
  ${posters}
`
