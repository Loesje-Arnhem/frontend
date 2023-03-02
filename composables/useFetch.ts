import { DocumentNode } from 'graphql'

export const useFetchMore = () => {
  const { clients } = useApollo()
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
      if (!clients) {
        return
      }
      loading.value = true
      const endCursor = items.value?.pageInfo?.endCursor || null
      const { data } = await clients.defaultClient.query({
        query,
        variables: {
          ...variables,
          after: endCursor,
        },
      })
      return data
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    fetchMore,
  }
}
