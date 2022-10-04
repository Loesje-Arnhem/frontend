import { IBaseContent } from './INode'
import { IProducts } from './IProduct'

export interface IProductCategory extends IBaseContent {
  description: string | null
  products: IProducts
}
