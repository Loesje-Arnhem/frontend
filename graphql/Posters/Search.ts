import { gql } from '@apollo/client/core'
import posterBase from './Fragments/PosterBase'

export default gql`
  query Search($search: String) {
    posters(where: { search: $search }, first: 10) {
      edges {
        node {
          uri
          ...posterBase
        }
      }
    }
  }
  ${posterBase}
`
