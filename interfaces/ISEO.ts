export interface ISEOImage {
  archive: string | null
}

export interface ISEO {
  metaDesc: string
  canonical: string
  cornerstone: boolean
  opengraphAuthor: string
  opengraphDescription: string
  opengraphImage: ISEOImage
  opengraphModifiedTime: string
  opengraphPublishedTime: string
  opengraphPublisher: string
  opengraphTitle: string
  opengraphType: string
  opengraphUrl: string
  title: string
  twitterDescription: string
  twitterImage: ISEOImage
  twitterTitle: string
  schema: {
    raw: string
  }
}
