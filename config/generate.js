import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import fetch from 'node-fetch'
import { apiUrl } from '../data/siteDetails'
import { GetPages } from './../graphql/Pages/Pages'
import { GetProductCategories } from './../graphql/ProductCategories/ProductCategory'

const link = new HttpLink({
  uri: `${apiUrl}graphql`,
  fetch,
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const getPages = async () => {
  try {
    const { data } = await client.query({
      query: GetPages,
    })
    return data.pages.edges.map((item) => {
      console.log(item.node.uri)
      return {
        route: item.node.uri,
        payload: item.node,
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const getProductCategories = async () => {
  try {
    const { data } = await client.query({
      query: GetProductCategories,
    })

    return data.productCategories.edges.map((item) => {
      console.log(item.node.uri)

      return {
        route: item.node.uri,
        payload: item.node,
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export default {
  // concurrency: 20,
  // interval: 3000,
  crawler: false,
  exclude: [
    /^\/mijn-account/, // path starts with /admin
    /^\/shop/, // path starts with /admin
    /^\/account/, // path starts with /admin
    /^\/posters/, // path starts with /admin
    /^\/over-loesje/, // path starts with /admin
    /^\/shop/, // path starts with /admin
  ],
  routes: async () => {
    const pages = await getPages()
    const productCategories = await getProductCategories()

    return [...pages, ...productCategories]
  },
}
