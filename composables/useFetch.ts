import { useContext } from '@nuxtjs/composition-api'
import { DocumentNode } from 'graphql'

export default () => {
  const { app, payload } = useContext()
  // const { app } = useContext()

  const fetch = async ({
    query,
    variables,
    usePayload = false,
  }: {
    query: DocumentNode
    variables?: Object
    usePayload?: Boolean
  }) => {
    if (payload && usePayload) {
      return payload
    }
    try {
      const { data } = await app.apolloProvider.defaultClient.query({
        query,
        variables,
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fetch,
  }
}
