import { useQuery, useResult } from '@vue/apollo-composable'
import PostsQuery from '~/graphql/Posts/Posts.gql'
import PostQuery from '~/graphql/Posts/Post.gql'

export default ({ first = 12, notIn = null } = {}) => {
  const { result, error, loading, fetchMore } = useQuery(
    PostsQuery,
    {
      first,
      notIn,
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

export const usePost = (slug) => {
  const { result, error, loading } = useQuery(PostQuery, {
    slug,
  })

  const post = useResult(result)

  return {
    post,
    error,
    loading,
  }
}
