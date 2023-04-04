import { IFeaturedImage } from '~/interfaces/IContent'
import { IResponseImage } from '~~/interfaces/IResponse'

export default (featuredImage: IResponseImage[] | undefined, title?: string) => {
  if (!featuredImage) {
    return undefined
  }
  const image = featuredImage[0]
  const srcSet = Object.values(image.media_details.sizes).map((size) => {
    return `${size?.source_url} ${size?.width}w`
  })
  let alt = ''
  if (title) {
    alt = title
  } else if (image.alt_text) {
    alt = image.alt_text

  const result: IFeaturedImage =  {
    alt,
    width: image.media_details.width,
    height: image.media_details.height,
    src: image.source_url,
    srcSet: srcSet.join(','),
  }
  return result
}
