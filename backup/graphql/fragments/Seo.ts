import { gql } from '@apollo/client/core'

export default gql`
  fragment seo on PostTypeSEO {
    canonical
    cornerstone
    metaDesc
    opengraphAuthor
    opengraphDescription
    opengraphImage {
      mediaItemUrl
    }
    opengraphModifiedTime
    opengraphPublishedTime
    opengraphPublisher
    opengraphTitle
    opengraphType
    opengraphUrl
    title
    twitterDescription
    twitterImage {
      mediaItemUrl
    }
    twitterTitle
    schema {
      raw
    }
  }
`

export const taxonomySeo = gql`
  fragment taxonomySeo on TaxonomySEO {
    canonical
    cornerstone
    metaDesc
    opengraphAuthor
    opengraphDescription
    opengraphImage {
      mediaItemUrl
    }
    opengraphModifiedTime
    opengraphPublishedTime
    opengraphPublisher
    opengraphTitle
    opengraphType
    opengraphUrl
    title
    twitterDescription
    twitterImage {
      mediaItemUrl
    }
    twitterTitle
    schema {
      raw
    }
  }
`
