<template>
  <apollo-query
    :query="require('~/graphql/Products.gql')"
    :variables="{ where }"
  >
    <template v-slot="{ result: { data }, isLoading }">
      <slot v-if="data" :products="data.products.edges" />
      <app-loader v-if="isLoading" />
    </template>
  </apollo-query>
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
  },
  computed: {
    where() {
      if (this.category) {
        return {
          stockStatus: 'IN_STOCK',
          categoryId: this.category,
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
