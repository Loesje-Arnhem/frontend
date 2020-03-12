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
import ProductDetails from '@/components/Shop/ProductDetails.vue'
import ProductList from '@/components/Shop/ProductList.vue'
import ProductQuery from '~/graphql/Product.gql'

export default {
  components: {
    ProductDetails,
    ProductList,
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

  data() {
    return {
      title: 'Winkeltje',
    }
  },

  head() {
    return {
      title: this.title,
    }
  },
}
</script>
