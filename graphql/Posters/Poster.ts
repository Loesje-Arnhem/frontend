import { gql } from '@apollo/client/core'
import seo from '../Fragments/Seo'
import featuredImage from '../Media/Fragments/FeaturedImage'
import posterBase from './Fragments/PosterBase'
import relatedPosters from './Fragments/RelatedPosters'
import posters from './Fragments/Posters'
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
      ...featuredImage
    }
    # relatedProducts: relatedProductsGroup {
    #   ...posterRelatedProducts
    # }
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
    seo {
      ...seo
    }
    relatedPosters(first: ${PAGE_SIZE_POSTERS}) {
      pageInfo {
        hasNextPage
        endCursor
      }
      ...relatedPosters
    }
  }
  ${featuredImage}
  ${posterBase}
  ${relatedPosters}
  ${subjectDetails}
  ${sourceDetails}
  ${seo}
`

export default gql`
  query Poster($slug: ID!) {
    poster(id: $slug, idType: SLUG) {
      ...posterDetails
    }
  }
  ${posterDetails}
`

export const GetPosters = gql`
  query Posters(
    $first: Int
    $after: String
    $where: RootQueryToPosterConnectionWhereArgs
  ) {
    posters(first: $first, after: $after, where: $where) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          ...posters
        }
      }
    }
  }
  ${posters}
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
