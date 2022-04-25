import { useQuery, useResult } from '@vue/apollo-composable'
import { computed, useRoute, useMeta, ref } from '@nuxtjs/composition-api'
import useFetch from '~/composables/useFetch'
import PostsQuery from '~/graphql/Posts/Posts.gql'
import { getPost } from '~/graphql/Posts/Posts'

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
        // @ts-ignore
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

  const hasNextPage = computed(() => {
    if (!posts.value) return true
    return posts.value.pageInfo.hasNextPage
  })

  return {
    hasNextPage,
    loadMore,
    posts,
    error,
    loading,
  }
}

export const usePost = () => {
  const route = useRoute()
  const { slug } = route.value.params

  const param = computed(() => slug)

  const loading = ref(false)

  const { result } = useFetch({
    query: getPost,
    usePayload: true,
    variables: {
      slug,
    },
    params: param,
    pageKey: 'post',
  })

  const post = computed(() => result.value?.post)

  useMeta(() => ({ title: post.value?.title }))

  return {
    loading,
    post,
  }
}
