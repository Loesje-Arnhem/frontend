<template>
  <section aria-labelledby="featured-products">
    <h1 id="featured-products">Gerelateerde producten</h1>
    <products-container :category="category" :database-ids="databaseIds" />
  </section>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    category: {
      type: Number,
      default: 0,
    },
    relatedProducts: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const databaseIds = computed(() => {
      if (props.relatedProducts.length) {
        return props.relatedProducts.map((product) => product.node.databaseId)
      }
      return []
    })
    return {
      databaseIds,
    }
  },
})
</script>
