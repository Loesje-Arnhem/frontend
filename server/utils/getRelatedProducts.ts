import { IResponsePage } from '~~/server/types/IResponsePage'
import { IResponsePost } from '../types/IResponsePost'

export default (page: IResponsePage | IResponsePost) => {
  const {
    related_products_products,
  } = page.acf
  let productIds: number[] = []
  if (related_products_products) {
    productIds = related_products_products.map((product) => product.product.ID)
  }

  return productIds
}
