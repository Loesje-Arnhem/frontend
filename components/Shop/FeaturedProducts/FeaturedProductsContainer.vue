<template>
  <apollo-query :query="require('~/graphql/FeaturedProducts.gql')">
    <template slot-scope="{ result: { data }, isLoading }">
      <product-list v-if="data" :products="data.products.edges" />
      <app-loader v-if="isLoading" />
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '@/components/Shared/AppLoader.vue'
import ProductList from '@/components/Shop/ProductList.vue'

export default {
  components: {
    AppLoader,
    ProductList
  }
}
</script>
