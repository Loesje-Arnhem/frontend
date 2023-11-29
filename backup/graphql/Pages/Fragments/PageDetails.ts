import { gql } from '@apollo/client/core'
import pageContent from './PageContent'
import relatedPages from './RelatedPages'
import seo from './../../Fragments/Seo'

export default gql`
  fragment pageDetails on Page {
    ...pageContent
    ...relatedPages
    seo {
      ...seo
    }
  }
  ${relatedPages}
  ${pageContent}
  ${seo}
`
