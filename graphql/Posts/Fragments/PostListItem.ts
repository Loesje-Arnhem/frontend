import { gql } from '@apollo/client/core'
import postBase from './PostBase'

export default gql`
  fragment postListItem on Post {
    ...postBase
    excerpt
    uri
  }
  ${postBase}
`
