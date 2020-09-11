import { useQuery, useResult } from '@vue/apollo-composable'
import PostsQuery from '~/graphql/Posts/Posts.gql'

export default ({ first = 12 } = {}) => {
  const { result, error, loading, fetchMore } = useQuery(
    PostsQuery,
    {
      first,
    },
    {
      notifyOnNetworkStatusChange: true,
    },
  )

  const posts = useResult(result)

  const loadMore = async () => {
    const { endCursor } = posts.value.pageInfo
    await fetchMore({
      variables: {
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          posts: {
            ...previousResult.posts,
            pageInfo: fetchMoreResult.posts.pageInfo,
            edges: [
              ...previousResult.posts.edges,
              ...fetchMoreResult.posts.edges,
            ],
          },
        }
      },
    })
  }

  return {
    loadMore,
    posts,
    error,
    loading,
  }
}
