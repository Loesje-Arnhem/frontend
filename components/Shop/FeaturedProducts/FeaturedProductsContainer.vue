<template>
  <apollo-query
    :query="require('~/graphql/FeaturedProducts.gql')"
    :variables="{ first: 5, where: where }"
  >
    <template v-slot="{ result: { data }, isLoading }">
      <slot v-if="data" :products="data.products.edges" />
      <app-loader v-if="isLoading" />
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '@/components/Shared/AppLoader.vue'

export default {
  components: {
    AppLoader,
  },
  props: {
    relatedProducts: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    productIds() {
      if (this.relatedProducts.relatedProductsProducts) {
        return this.relatedProducts.relatedProductsProducts.map(
          (product) => product.product.productId,
        )
      }
      return []
    },
    where() {
      if (this.productIds.length) {
        return {
          stockStatus: 'IN_STOCK',
          include: this.productIds,
        }
      }

      return {
        stockStatus: 'IN_STOCK',
        featured: true,
      }
    },
  },
}
</script>
