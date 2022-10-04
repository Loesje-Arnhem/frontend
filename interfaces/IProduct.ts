import { IFeaturedImage } from './IMedia'
import { IBaseContent, INodeBase } from './INode'

export interface IProductTile extends INodeBase {
  slug: string
  name: string
  featuredImage: IFeaturedImage | null
  regularPrice: string
  price: string
  salePrice: string
}

export interface IRelatedProductProduct {
  product: IProductTile
}

export interface IProductNode {
  node: IProductTile
}

export interface IProducts {
  edges: IProductNode[]
}

export interface IRelatedProducts {
  title: string | null
  products: IRelatedProductProduct[] | null
}

export interface IProduct extends IBaseContent {
  shortDescription: string | null
  description: string | null
  stockStatus: string
  featuredImage: IFeaturedImage | null
  galleryImages: {
    edges: IFeaturedImage[]
  }
}
