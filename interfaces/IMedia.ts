interface IMediaDetails {
  width: number
  height: number
}

export interface IImage {
  id: string
  srcSet: string
  src: string
  mediaDetails: IMediaDetails
}

export interface IFeaturedImage {
  node: IImage
}

export interface IVideo {
  youtubeId: string | null
}
