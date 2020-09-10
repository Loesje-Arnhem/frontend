import { useQuery, useResult } from '@vue/apollo-composable'
import PostsQuery from '~/graphql/Posts/Posts.gql'

export default ({ first = 3 } = {}) => {
  const { result, error, loading } = useQuery(PostsQuery, {
    first,
  })

  const posts = useResult(result)

  return {
    posts,
    error,
    loading,
  }
}
