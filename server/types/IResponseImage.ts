interface IResponseImageSize {
  width: number
  height: number
  source_url: string
}

export interface IResponseImage {
  alt_text: string
  source_url: string
  media_details: {
    width: number
    height: number
    sizes: {
      thumbnail: IResponseImageSize
      full: IResponseImageSize
      medium?: IResponseImageSize
      large?: IResponseImageSize
      medium_large?: IResponseImageSize
    }
  }
}