import { gql } from '@apollo/client/core'
import pageContent from './PageContent'
import relatedPages from './RelatedPages'

export default gql`
  fragment pageDetails on Page {
    ...pageContent
    ...relatedPages
  }
  ${relatedPages}
  ${pageContent}
`
