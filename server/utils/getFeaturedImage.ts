import { IResponseImage } from '~~/interfaces/IResponse'

export default (featuredImage: IResponseImage) => {
  if (!featuredImage['wp:featuredmedia']) {
    return undefined
  }
  const image = featuredImage['wp:featuredmedia'][0]
  const srcSet = Object.values(image.media_details.sizes).map((size) => {
    return `${size?.source_url} ${size?.width}w`
  })

  return {
    alt: image.alt_text,
    width: image.media_details.width,
    height: image.media_details.height,
    src: image.source_url,
    srcSet: srcSet.join(','),
  }
}
