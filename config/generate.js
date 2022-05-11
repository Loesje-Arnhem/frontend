import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
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
    /^\/account/, // path starts with /admin
    /^\/shop/, // path starts with /admin
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

    const posters = await fetchPosters(client)
    // await pauseFetching()
    // const pages = await fetchPages(client)
    // await pauseFetching()
    // const productCategories = await fetchProductCategories(client)
    // await pauseFetching()
    // const posts = await fetchPosts(client)
    return [...posters]

    // return [...posters, pages, productCategories, posts]
  },
}
