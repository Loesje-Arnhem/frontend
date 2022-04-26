import { gql } from '@apollo/client/core'
import { PAGE_SIZE_PAGE_RELATED_POSTERS } from './../../../data/pageSizes'
import page from './Page'
import relatedProducts from './RelatedProducts'
import relatedPosters from './../../Posters/Fragments/RelatedPosters'

export default gql`
  fragment pageContent on Page {
    ...page
    content
    videoGroup {
      youtubeId
    }
    relatedProducts: relatedProductsGroup {
      ...relatedProducts
    }
    relatedPosters(first: ${PAGE_SIZE_PAGE_RELATED_POSTERS}) {
      ...relatedPosters
    }
  }
  ${page}
  ${relatedProducts}
  ${relatedPosters}
`
