<template>
  <apollo-query
    :query="require('~/graphql/Products/Products.gql')"
    :variables="{ where, first: size }"
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
    databaseIds: {
      type: Array,
      default: () => [],
    },
    size: {
      type: Number,
      default: 99,
    },
  },
  computed: {
    where() {
      const inStock = {
        stockStatus: 'IN_STOCK',
      }

      if (this.databaseIds.length) {
        return {
          ...inStock,
          include: this.databaseIds,
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
