import { useContext } from '@nuxtjs/composition-api'
import { DocumentNode } from 'graphql'

export default () => {
  const { app, payload } = useContext()

  const fetch = async ({
    query,
    variables,
  }: {
    query: DocumentNode
    variables?: Object
  }) => {
    if (payload) {
      return payload
    }
    return await app.apolloProvider.defaultClient.query({
      query,
      variables,
    })
  }

  return {
    fetch,
  }
}
