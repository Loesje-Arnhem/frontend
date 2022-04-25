import { gql } from '@apollo/client/core'
import postBase from './PostBase'
import postRelatedProductsGroup from './PostRelatedProductsGroup'
import relatedPosts from './RelatedPosts'

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
    ...relatedPosts
  }
  ${postBase}
  ${postRelatedProductsGroup}
  ${relatedPosts}
`
