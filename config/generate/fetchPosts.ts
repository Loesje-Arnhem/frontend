import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { GetAllPosts } from './../../graphql/Posts/Posts'
import pauseFetching from './pauseFetching'

export default async (client: ApolloClient<NormalizedCacheObject>) => {
  let hasNextPage = true
  let after = null
  let posts: any[] = []
  while (hasNextPage) {
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
    await pauseFetching(`posts ${after}`)
    after = data.posts.pageInfo.endCursor
    // hasNextPage = data.posts.pageInfo.hasNextPage
    hasNextPage = false
    posts = posts.concat(newPosts)
  }
  return posts
}
