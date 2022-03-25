export interface ISEOImage {
  archive: string
}

export interface ISEO {
  canonical: string
  cornerstone: boolean
  metaDesc: string
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
}
