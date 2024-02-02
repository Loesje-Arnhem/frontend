export type ResponseProductImage = {
  src: string
  alt: string
  srcset: string
}

export type ResponseProducts = {
  id: number
  name: string
  slug: string
  price: string
  regular_price: string
  external_url: string
  images: ResponseProductImage[]
}
