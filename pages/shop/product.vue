<template>
  <div class="product">
    <product-details :product="product" />
    <product-list-section :related-products="product.related.edges" />
  </div>
</template>

<script>
import ProductDetails from '~/components/Shop/ProductDetails.vue'
import ProductListSection from '~/components/Shop/ProductList/ProductListSection.vue'
import ProductQuery from '~/graphql/Product.gql'

export default {
  components: {
    ProductDetails,
    ProductListSection,
  },
  async asyncData({ app, params }) {
    const product = await app.apolloProvider.defaultClient.query({
      query: ProductQuery,
      variables: {
        slug: params.slug,
      },
    })
    return {
      product: product.data.product,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/:slug',
    },
  },
  head() {
    return {
      title: this.product.name,
    }
  },
}
</script>
