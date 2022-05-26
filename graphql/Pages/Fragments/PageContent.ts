import { gql } from '@apollo/client/core'
import { PAGE_SIZE_PAGE_RELATED_POSTERS } from './../../../data/pageSizes'
import page from './Page'
import pageRelatedProducts from './PageRelatedProducts'
import relatedPosters from './../../Posters/Fragments/RelatedPosters'

export default gql`
  fragment pageContent on Page {
    ...page
    content
    videoGroup {
      youtubeId
    }
    relatedProducts: relatedProductsGroup {
      ...pageRelatedProducts
    }
    relatedPosters(first: ${PAGE_SIZE_PAGE_RELATED_POSTERS}) {
      ...relatedPosters
    }
  }
  ${page}
  ${pageRelatedProducts}
  ${relatedPosters}
`
