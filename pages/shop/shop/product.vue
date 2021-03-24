<template>
  <shop-wrapper>
    <template v-if="product">
      <product-details :product="product" />
      <product-list-section :related-products="product.related.edges" />
    </template>
  </shop-wrapper>
</template>

<script>
import ProductQuery from '~/graphql/Products/Product.gql'

export default {
  async asyncData({ app, params }) {
    const { defaultClient } = app.apolloProvider
    const result = await defaultClient.query({
      query: ProductQuery,
      variables: {
        slug: params.slug,
      },
    })
    return {
      product: result.data.product,
    }
  },
  head() {
    return {
      title: this.product.name,
    }
  },

  nuxtI18n: {
    paths: {
      nl: '/winkeltje/:slug',
    },
  },
}
</script>
