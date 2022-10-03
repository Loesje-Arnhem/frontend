import { ApolloClient, HttpLink } from '@apollo/client/core'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { apiUrl } from '../data/siteDetails'
import fetchPages from './generate/fetchPages'
import fetchPosts from './generate/fetchPosts'
import fetchPosters from './generate/fetchPosters'
import fetchProductCategories from './generate/fetchProductCategories'
import pauseFetching from './generate/pauseFetching'

export default {
  // concurrency: 1,
  // interval: 3000,
  crawler: false,
  exclude: [
    /^\/mijn-account/, // path starts with /admin
    /^\/shop/, // path starts with /admin
    /^\/account/, // path starts with /admin,
    /^\/winkeltje/, // path starts with /admin,
    '/over-loesje/nieuws/no-route',
    '/over-loesje/nieuws/enable-cookies',
  ],
  interval: 100,
  concurrency: 100,
  routes: async () => {
    const PARTIAL_SCHEMA = {
      __schema: {
        types: [],
      },
    }
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: PARTIAL_SCHEMA,
    })

    const config = {
      typePolicies: {
        GraphQlConfigurationOption: {
          keyFields: ['id'],
        },
      },
      fragmentMatcher,
    }

    const cache = new InMemoryCache(config)

    const link = new HttpLink({
      uri: `${apiUrl}graphql`,
      fetch,
    })

    const client = new ApolloClient({
      link,
      httpLinkOptions: {
        credentials: 'include',
      },
      cache,
      wsEndpoint: null,
      persisting: false,
      websocketsOnly: false,
    })

    // const posters = await fetchPosters(client)
    // await pauseFetching()
    // const pages = await fetchPages(client)
    // await pauseFetching()
    // const productCategories = await fetchProductCategories(client)
    // await pauseFetching()
    // const posts = await fetchPosts(client)

    // return [...pages, ...posts, ...posters]
    return []
  },
}
