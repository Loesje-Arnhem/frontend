interface IMediaDetails {
  width: number
  height: number
}

export interface IFeaturedImage {
  node: {
    id: string
    mediaItemUrl: string
    mediaDetails: IMediaDetails
  }
}
