import { useContext, useStatic, Ref } from '@nuxtjs/composition-api'
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

  const result = useStatic(
    async () => {
      if (payload && usePayload) {
        return payload
      }
      const { data } = await app.apolloProvider.defaultClient.query({
        query,
        variables,
      })
      return data
    },
    params,
    pageKey,
  )

  return {
    result,
  }
}
