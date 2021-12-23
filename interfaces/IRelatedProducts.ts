export interface IrelatedProductsProduct {
  product: {
    databaseId: number
  }
}

export interface IRelatedProducts {
  title: string | null
  products: IrelatedProductsProduct[] | null
}
