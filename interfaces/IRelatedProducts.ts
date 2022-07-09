import { INodeBase } from './INode'

export interface IRelatedProduct extends INodeBase {
  slug: string
  name: string
  image: {
    id: string
    altText: string | null
    thumbnail: string | null
    medium: string | null
    mediumLarge: string | null
  }
  regularPrice: string
  price: string
  salePrice: string
}

export interface IRelatedProductNode {
  product: IRelatedProduct
}

export interface IRelatedProducts {
  title: string | null
  products: IRelatedProductNode[] | null
}
