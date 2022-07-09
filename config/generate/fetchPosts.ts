import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { GetAllPosts } from './../../graphql/Posts/Posts'
import pauseFetching from './pauseFetching'

export default async (client: ApolloClient<NormalizedCacheObject>) => {
  let hasNextPage = true
  let after = null
  let posts: any[] = []
  while (hasNextPage) {
    try {
      // @ts-ignore
      const { data } = await client.query({
        query: GetAllPosts,
        variables: {
          after,
        },
      })
      const newPosts = data.posts.edges.map((item: any) => {
        return {
          route: `/over-loesje/nieuws/${item.node.slug}`,
          payload: {
            post: item.node,
          },
        }
      })
      await pauseFetching(`posts`)
      after = data.posts.pageInfo.endCursor
      hasNextPage = data.posts.pageInfo.hasNextPage
      posts = posts.concat(newPosts)
    } catch (error) {
      console.error(error)
    }
  }
  return posts
}
