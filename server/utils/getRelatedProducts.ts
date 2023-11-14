import type { ResponsePage } from '~~/server/types/ResponsePage'
import type { ResponsePost } from '../types/ResponsePost'

export default (page: ResponsePage | ResponsePost) => {
  const { related_products_products } = page.acf
  let productIds: number[] = []
  if (related_products_products) {
    productIds = related_products_products.map((product) => product.product.ID)
  }

  return productIds
}
