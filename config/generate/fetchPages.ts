import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { GetAllPages } from './../../graphql/Pages/Pages'
import pauseFetching from './pauseFetching'

export default async (client: ApolloClient<NormalizedCacheObject>) => {
  let hasNextPage = true
  let after = null
  let pages: any[] = []
  while (hasNextPage) {
    try {
      // @ts-ignore
      const { data } = await client.query({
        query: GetAllPages,
        variables: {
          after,
        },
      })
      const newPages = data.pages.edges.map((item: any) => {
        return {
          route: item.node.uri,
          payload: {
            page: item.node,
          },
        }
      })
      await pauseFetching()
      after = data.pages.pageInfo.endCursor
      hasNextPage = data.pages.pageInfo.hasNextPage
      pages = pages.concat(newPages)
    } catch (error) {
      console.error(error)
    }
  }
  return pages
}
