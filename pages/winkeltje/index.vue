<template>
  <product-list v-if="products.edges" :products="products.edges" />
</template>

<script>
import ProductsQuery from '~/graphql/Products.gql'
import ProductList from '@/components/Shop/ProductList.vue'
export default {
  components: {
    ProductList
  },

  data() {
    return {
      title: 'Winkeltje'
    }
  },
  async asyncData({ app }) {
    const products = await app.apolloProvider.defaultClient.query({
      query: ProductsQuery,
      variables: {
        categoryName: 'aanbieding'
      }
    })

    return {
      products: products.data.products
    }
  },

  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped lang="postcss">
.list {
  @mixin list-reset;
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}
</style>
