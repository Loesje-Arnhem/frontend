<template>
  <section aria-labelledby="featured-products">
    <h1 id="featured-products">Gerelateerde producten</h1>
    <products-container :category="category" :database-ids="databaseIds">
      <template #default="data">
        <product-list v-if="data" :products="data.products" />
      </template>
    </products-container>
  </section>
</template>

<script>
import ProductsContainer from '~/components/Shop/Products/Data/ProductsContainer.vue'
import ProductList from '~/components/Shop/Products/Shared/ProductList.vue'

export default {
  components: {
    ProductsContainer,
    ProductList,
  },
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
  computed: {
    databaseIds() {
      if (this.relatedProducts.length) {
        return this.relatedProducts.map((product) => product.node.databaseId)
      }
      return []
    },
  },
}
</script>
