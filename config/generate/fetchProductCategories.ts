import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { GetAllProductCategories } from './../../graphql/ProductCategories/ProductCategory'

export default async (client: ApolloClient<NormalizedCacheObject>) => {
  try {
    const { data } = await client.query({
      query: GetAllProductCategories,
    })

    return data.productCategories.edges.map((item: any) => {
      return {
        route: item.node.uri,
        payload: {
          productCategory: item.node,
        },
      }
    })
  } catch (error) {
    console.error(error)
  }
}
