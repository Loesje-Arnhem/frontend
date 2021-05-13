<template>
  <shop-wrapper>
    <product-details :product="product" />

    <product-list-section :related-products="product.related.edges" />
  </shop-wrapper>
</template>

<script>
import ProductDetails from '~/components/Shop/Products/ProductDetails/ProductDetails.vue'
import ProductListSection from '~/components/Shop/Products/ProductList/ProductListSection.vue'
import ProductQuery from '~/graphql/Products/Product.gql'
import ShopWrapper from '~/components/Shop/Layout/ShopWrapper.vue'

export default {
  components: {
    ShopWrapper,
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
