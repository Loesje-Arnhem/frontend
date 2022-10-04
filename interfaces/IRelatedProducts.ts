import { IFeaturedImage } from './IMedia'
import { INodeBase } from './INode'

export interface IRelatedProduct extends INodeBase {
  slug: string
  name: string
  featuredImage: IFeaturedImage | null
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
