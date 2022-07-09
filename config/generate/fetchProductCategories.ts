import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { GetAllProductCategories } from './../../graphql/ProductCategories/ProductCategory'
import pauseFetching from './pauseFetching'

export default async (client: ApolloClient<NormalizedCacheObject>) => {
  let hasNextPage = true
  let after = null
  let productCategories: any[] = []
  while (hasNextPage) {
    try {
      // @ts-ignore
      const { data } = await client.query({
        query: GetAllProductCategories,
        variables: {
          after,
        },
      })
      const newproductCategories = data.productCategories.edges.map(
        (item: any) => {
          return {
            route: item.node.uri,
            payload: {
              productCategory: item.node,
            },
          }
        },
      )
      await pauseFetching(`productCategories`)

      after = data.productCategories.pageInfo.endCursor
      hasNextPage = data.productCategories.pageInfo.hasNextPage
      productCategories = productCategories.concat(newproductCategories)
    } catch (error) {
      console.error(error)
    }
  }
  return productCategories
}
