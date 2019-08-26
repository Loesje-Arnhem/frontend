<template>
  <div class="product">
    <product-details :product="product" />
    <product-list
      v-if="product.related.edges"
      :products="product.related.edges"
    />
  </div>
</template>

<script>
import ProductQuery from '~/graphql/Product.gql'
import ProductDetails from '@/components/Shop/ProductDetails.vue'
import ProductList from '@/components/Shop/ProductList.vue'

export default {
  components: {
    ProductDetails,
    ProductList
  },

  data() {
    return {
      title: 'Winkeltje'
    }
  },
  async asyncData({ app, params }) {
    const product = await app.apolloProvider.defaultClient.query({
      query: ProductQuery,
      variables: {
        slug: params.slug
      }
    })

    return {
      product: product.data.product
    }
  },

  head() {
    return {
      title: this.title
    }
  }
}
</script>
