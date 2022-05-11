import { gql } from '@apollo/client/core'

import posterBase from './Fragments/PosterBase'
import relatedProducts from './Fragments/RelatedProducts'
import relatedPosters from './Fragments/RelatedPosters'
import sourceDetails from './Fragments/SourceDetails'
import subjectDetails from './Fragments/SubjectDetails'
import { PAGE_SIZE_POSTERS } from './../../data/pageSizes'
import { TOTAL_PAGES } from './../../data/generate'

const posterDetails = gql`
  fragment posterDetails on Poster {
    ...posterBase
    date
    uri
    link
    featuredImage {
      node {
        id
        large: sourceUrl(size: LARGE)
        medium: sourceUrl(size: MEDIUM)
      }
    }
    relatedProducts: relatedProductsGroup {
      ...relatedProducts
    }
    PosterMetaGroup {
      date
      pdf {
        mediaItemUrl
      }
    }
    sources {
      edges {
        node {
          ...sourceDetails
        }
      }
    }
    subjects {
      edges {
        node {
          ...subjectDetails
        }
      }
    }
    # seo {
    #   ...seo
    # }
    relatedPosters(first: ${PAGE_SIZE_POSTERS}) {
      pageInfo {
        hasNextPage
        endCursor
      }
      ...relatedPosters
    }
  }

  ${posterBase}
  ${relatedPosters}
  ${relatedProducts}
  ${subjectDetails}
  ${sourceDetails}
`

export default gql`
  query Poster($slug: ID!) {
    poster(id: $slug, idType: SLUG) {
      ...posterDetails
    }
  }
  ${posterDetails}
`

export const GetAllPosters = gql`
  query Posters($after: String) {
    posters(first: ${TOTAL_PAGES}, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...posterDetails
        }
      }
    }
  }
  ${posterDetails}
`
