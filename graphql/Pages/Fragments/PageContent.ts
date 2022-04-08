import { gql } from '@apollo/client/core'
import page from './Page'
import relatedProductsPageGroup from './RelatedProducts'

export default gql`
  fragment pageContent on Page {
    ...page
    content
    videoGroup {
      youtubeId
    }
    relatedProducts: relatedProductsGroup {
      ...relatedProductsPageGroup
    }
  }
  ${page}
  ${relatedProductsPageGroup}
`
