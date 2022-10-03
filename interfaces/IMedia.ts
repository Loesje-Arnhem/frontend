interface IMediaDetails {
  width: number
  height: number
}

export interface IFeaturedImage {
  node: {
    id: string
    srcSet: string
    src: string
    mediaDetails: IMediaDetails
  }
}
