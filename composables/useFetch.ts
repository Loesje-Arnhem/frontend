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
