type IMediaDetails = {
  width: number
  height: number
}

export type IImage = {
  id: string
  srcSet: string
  src: string
  mediaDetails: IMediaDetails
}

export type IFeaturedImage = {
  node: IImage
}

export type IVideo = {
  youtubeId: string | null
}
