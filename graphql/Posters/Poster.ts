import { gql } from '@apollo/client/core'
import posterBase from './Fragments/PosterBase'
import posterRelatedProducts from './Fragments/PosterRelatedProducts'
import relatedPosters from './Fragments/RelatedPosters'
import sourceDetails from './Fragments/SourceDetails'
import subjectDetails from './Fragments/SubjectDetails'
import { PAGE_SIZE_POSTERS } from './../../data/pageSizes'
import { TOTAL_POSTERS } from './../../data/generate'

const posterDetails = gql`
  fragment posterDetails on Poster {
    ...posterBase
    slug
    date
    uri
    link
    featuredImage {
      node {
        id
        srcSet
        large: sourceUrl(size: MEDIUM_LARGE)
      }
    }
    relatedProducts: relatedProductsGroup {
      ...posterRelatedProducts
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
  ${posterRelatedProducts}
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
    posters(first: ${TOTAL_POSTERS}, after: $after) {
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
