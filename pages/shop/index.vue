<template>
  <shop-wrapper>
    <h1>{{ page.title }}</h1>
    <p v-if="page.content" v-html="page.content" />
    <product-list v-if="products.edges.length" :products="products.edges" />
  </shop-wrapper>
</template>

<script>
import { shopPageId } from '~/data/pages'
import ShopPageQuery from '~/graphql/Shop/ShopPage.gql'
import getSeoMetaData from '~/utils/seo'

export default {
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider
    const page = await defaultClient.query({
      query: ShopPageQuery,
      variables: {
        id: shopPageId,
      },
    })

    return {
      page: page.data.page,
      products: page.data.products,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/',
    },
  },
  head() {
    return getSeoMetaData(this.page.seo)
  },
}
</script>
