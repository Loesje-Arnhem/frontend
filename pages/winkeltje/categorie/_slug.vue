<template>
  <product-list v-if="products.edges" :products="products.edges" />
</template>

<script>
import ProductList from '@/components/Shop/ProductList.vue'
import ProductsQuery from '~/graphql/Products.gql'
export default {
  components: {
    ProductList
  },
  async asyncData({ app, params }) {
    const products = await app.apolloProvider.defaultClient.query({
      query: ProductsQuery,
      variables: {
        categoryName: params.slug
      }
    })

    return {
      products: products.data.products
    }
  },

  data() {
    return {
      title: 'Winkeltje'
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
