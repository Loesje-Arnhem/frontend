type ResponseImageSize = {
  width: number
  height: number
  source_url: string
}

export type ResponseImage = {
  alt_text: string
  source_url: string
  media_details: {
    width: number
    height: number
    sizes: {
      thumbnail: ResponseImageSize
      full: ResponseImageSize
      medium?: ResponseImageSize
      large?: ResponseImageSize
      medium_large?: ResponseImageSize
    }
  }
}
