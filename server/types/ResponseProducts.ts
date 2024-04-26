export type ResponseProductImage = {
  src: string
  alt: string
  srcset: string
}

export type ResponseProducts = {
  id: number
  name: string
  slug: string
  prices: {
    price: string
    regular_price: string
  }
  permalink: string
  external_url: string
  images: ResponseProductImage[]
}
