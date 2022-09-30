import { gql } from '@apollo/client/core'

export default gql`
  fragment seo on PostTypeSEO {
    canonical
    cornerstone
    metaDesc
    opengraphAuthor
    opengraphDescription
    opengraphImage {
      archive: sourceUrl(size: THUMBNAIL)
      # archive: sourceUrl(size: MEDIUM)
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
      archive: sourceUrl(size: THUMBNAIL)
      # archive: sourceUrl(size: MEDIUM)
    }
    twitterTitle
    schema {
      raw
    }
  }
`
