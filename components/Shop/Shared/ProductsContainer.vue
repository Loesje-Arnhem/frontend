<template>
  <div>
    <apollo-query
      :query="require('~/graphql/Products.gql')"
      :variables="{ where }"
    >
      <template v-slot="{ result: { data }, isLoading }">
        <app-loader v-if="isLoading" />
        <slot v-else-if="data" :products="data.products.edges" />
      </template>
    </apollo-query>
  </div>
</template>

<script>
import AppLoader from '~/components/Shared/AppLoader.vue'

export default {
  components: {
    AppLoader,
  },
  props: {
    category: {
      type: Number,
      default: 0,
    },
    productIds: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    where() {
      const inStock = {
        stockStatus: 'IN_STOCK',
      }
      if (this.category) {
        return {
          ...inStock,
          categoryId: this.category,
        }
      }

      if (this.productIds.length) {
        return {
          ...inStock,
          include: this.productIds,
        }
      }

      return {
        ...inStock,
        featured: true,
      }
    },
  },
}
</script>
