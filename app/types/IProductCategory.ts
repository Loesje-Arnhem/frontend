import type { IBaseContent } from './INode'
import type { IProducts } from './IProduct'

export type IProductCategory = IBaseContent & {
  description: string | null
  products: IProducts
}
