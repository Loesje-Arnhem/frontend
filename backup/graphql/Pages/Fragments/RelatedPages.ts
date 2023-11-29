import { gql } from '@apollo/client/core'
import page from './Page'

export default gql`
  fragment relatedPages on Page {
    relatedPages {
      edges {
        node {
          ...page
          excerpt
          uri
        }
      }
    }
  }
  ${page}
`
