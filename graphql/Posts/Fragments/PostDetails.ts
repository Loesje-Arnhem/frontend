import { gql } from '@apollo/client/core'
import { PAGE_SIZE_PAGE_RELATED_POSTERS } from './../../../data/pageSizes'
import postBase from './PostBase'
import postRelatedProductsGroup from './PostRelatedProductsGroup'
import relatedPosters from './../../Posters/Fragments/RelatedPosters'
import seo from './../../Fragments/Seo'
import featuredImage from './../../Media/Fragments/FeaturedImage'

export default gql`
  fragment postDetails on Post {
    ...postBase
    content
    videoGroup {
      youtubeId
    }
    featuredImage {
      ...featuredImage
    }
    relatedProducts: relatedProductsGroup {
      ...postRelatedProductsGroup
    }
    relatedPosters(first: ${PAGE_SIZE_PAGE_RELATED_POSTERS}) {
      ...relatedPosters
    }
    seo {
      ...seo
    }
  }
  ${postBase}
  ${postRelatedProductsGroup}
  ${relatedPosters}
  ${seo}
  ${featuredImage}
`
