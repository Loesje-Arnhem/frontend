import { type FeaturedImage } from '~/types/Content'
import { type ResponseImage } from '~~/server/types/ResponseImage'

export default (featuredImage: ResponseImage[] | undefined, title?: string) => {
  if (!featuredImage) {
    return undefined
  }
  const image = featuredImage[0]

  if (image.code) {
    return undefined
  }
  const srcSet = Object.values(image.media_details.sizes).map((size) => {
    return `${size?.source_url} ${size?.width}w`
  })
  let alt = ''
  if (title) {
    alt = title
  } else if (image.alt_text) {
    alt = image.alt_text
  }

  const result: FeaturedImage = {
    alt,
    width: image.media_details.width,
    height: image.media_details.height,
    src: image.source_url,
    srcSet: srcSet.join(','),
  }
  return result
}
