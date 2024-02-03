export type ResponseProductImage = {
  src: string
  alt: string
  srcset: string
}

export type ResponseProduct = {
  id: number
  name: string
  description: string
  short_description: string
  images: ResponseProductImage[]
  related_ids: number[]
  prices: {
    price: string
    regular_price: string
  }
  attributes: {
    slug: string
    id: number
    name: string
    options: string[]
  }[]
}
