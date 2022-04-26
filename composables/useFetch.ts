import { useContext, useStatic, Ref, ref } from '@nuxtjs/composition-api'
import { DocumentNode } from 'graphql'

export default ({
  query,
  pageKey,
  variables,
  params = undefined,
  usePayload = false,
}: {
  query: DocumentNode
  pageKey: string
  variables?: Object
  params?: Ref<string>
  usePayload?: Boolean
}) => {
  const { app, payload } = useContext()
  const loading = ref(false)
  const result = useStatic(
    async () => {
      loading.value = true
      try {
        if (payload && usePayload) {
          return payload
        }
        const { data } = await app.apolloProvider.defaultClient.query({
          query,
          variables,
        })
        return data
      } finally {
        loading.value = false
      }
    },
    params,
    pageKey,
  )

  return {
    loading,
    result,
  }
}

export const useFetchMore = () => {
  const { app } = useContext()
  const loading = ref(false)
  const fetchMore = async ({
    query,
    items,
    variables,
  }: {
    query: DocumentNode
    items: Ref<any>
    variables?: Object
  }) => {
    try {
      loading.value = true
      const { endCursor } = items.value.pageInfo
      const { data } = await app.apolloProvider.defaultClient.query({
        query,
        variables: {
          ...variables,
          after: endCursor,
        },
      })

      return {
        pageInfo: data.posts.pageInfo,
        edges: [...items.value.edges, ...data.posts.edges],
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    fetchMore,
  }
}
