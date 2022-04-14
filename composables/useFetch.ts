import { useContext, useStatic, Ref, ref } from '@nuxtjs/composition-api'
import { DocumentNode } from 'graphql'

export default ({
  pageKey,
  query,
  variables,
  param,
}: {
  pageKey: string
  query: DocumentNode
  variables?: any
  param?: Ref<string>
}) => {
  const { app, payload } = useContext()

  const loading = ref(false)

  const result = useStatic(
    async () => {
      if (payload) {
        return payload
      }
      const { data } = await app.apolloProvider.defaultClient.query({
        query,
        variables,
      })
      return data
    },
    param || undefined,
    pageKey,
  )

  return {
    result,
    loading,
  }
}
