import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { GetAllPosters } from './../../graphql/Posters/Poster'
import pauseFetching from './pauseFetching'

export default async (client: ApolloClient<NormalizedCacheObject>) => {
  let hasNextPage = true
  let after = null
  let posters: any[] = []
  while (hasNextPage) {
    try {
      // @ts-ignore
      const { data } = await client.query({
        query: GetAllPosters,
        variables: {
          after,
        },
      })
      const newPosters = data.posters.edges.map((item: any) => {
        return {
          route: item.node.uri,
          payload: {
            poster: item.node,
          },
        }
      })
      await pauseFetching(`posters`)
      after = data.posters.pageInfo.endCursor
      // hasNextPage = data.posters.pageInfo.hasNextPage
      hasNextPage = false
      posters = posters.concat(newPosters)
    } catch (error) {
      console.error(error)
    }
  }
  return posters
}
