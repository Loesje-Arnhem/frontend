<template>
  <shop-wrapper>
    <h1>{{ page.title }}</h1>
    <p v-if="page.content" v-html="page.content" />
    <product-list v-if="products.edges.length" :products="products.edges" />
  </shop-wrapper>
</template>

<script>
import { shopPageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import ProductsQuery from '~/graphql/Products/Products.gql'

export default {
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider
    const page = await defaultClient.query({
      query: PageByIdQuery,
      variables: {
        id: shopPageId,
      },
    })

    const products = await defaultClient.query({
      query: ProductsQuery,
      variables: {
        where: {
          featured: true,
          stockStatus: 'IN_STOCK',
        },
      },
    })

    return {
      page: page.data.page,
      products: products.data.products,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/',
    },
  },
  head() {
    return {
      title: this.page.title,
    }
  },
}
</script>
