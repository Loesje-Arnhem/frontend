<template>
  <apollo-query
    :query="require('~/graphql/Products/Products.gql')"
    :variables="{ where }"
  >
    <template #default="{ result: { data }, isLoading }">
      <app-loader v-if="isLoading" />
      <slot v-else-if="data" :products="data.products.edges" />
    </template>
  </apollo-query>
</template>

<script>
export default {
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
