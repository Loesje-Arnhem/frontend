import { gql } from '@apollo/client/core'
import {
  PAGE_SIZE_PAGE_RELATED_POSTERS,
  PAGE_SIZE_POSTS,
} from './../../../data/pageSizes'
import postBase from './PostBase'
import postRelatedProductsGroup from './PostRelatedProductsGroup'
import relatedPosts from './RelatedPosts'
import relatedPosters from './../../Posters/Fragments/RelatedPosters'
import seo from './../../Fragments/Seo'

export default gql`
  fragment postDetails on Post {
    ...postBase
    content
    videoGroup {
      youtubeId
    }
    featuredImage {
      node {
        image: sourceUrl(size: LARGE)
      }
    }
    relatedProducts: relatedProductsGroup {
      ...postRelatedProductsGroup
    }
    relatedPosts(first: ${PAGE_SIZE_POSTS}) {
      ...relatedPosts
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
  ${relatedPosts}
  ${relatedPosters}
  ${seo}
`
