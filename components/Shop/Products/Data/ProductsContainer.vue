<template>
  <div>
    <app-loader v-if="loading" />
    <product-list v-if="products" :products="products.edges" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useProducts from '~/composables/products'
export default defineComponent({
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
  setup(props) {
    const { products, loading } = useProducts(props.databaseIds, props.size)
    return {
      loading,
      products,
    }
  },
})
</script>
