import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import fetch from 'node-fetch'
import { apiUrl } from '../data/siteDetails'
import { GetPages } from './../graphql/Pages/Pages'

export default {
  // concurrency: 20,
  // interval: 3000,
  crawler: false,
  exclude: [
    /^\/mijn-account/, // path starts with /admin
    /^\/winkeltje/, // path starts with /admin
    /^\/shop/, // path starts with /admin
    /^\/account/, // path starts with /admin
    /^\/posters/, // path starts with /admin
    /^\/over-loesje/, // path starts with /admin
  ],
  routes: async () => {
    const link = new HttpLink({
      uri: `${apiUrl}graphql`,
      fetch,
    })

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })

    const { data } = await client.query({
      query: GetPages,
    })

    return data.pages.edges.map((page) => {
      return {
        route: page.node.uri,
        payload: page.node,
      }
    })
  },
}
