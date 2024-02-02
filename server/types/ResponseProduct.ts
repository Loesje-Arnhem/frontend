export type ResponseProductImage = {
  src: string
  alt: string
  srcset: string
}

export type ResponseProduct = {
  id: number
  name: string
  price: string
  regular_price: string
  description: string
  short_description: string
  images: ResponseProductImage[]
  related_ids: number[]
  attributes: {
    slug: string
    id: number
    name: string
    options: string[]
  }[]
}
