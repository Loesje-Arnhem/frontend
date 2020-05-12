<template>
  <div class="products">
    <product-list-container :category="category">
      <template v-slot="data">
        <ul v-if="data.products.length" class="list">
          <product-tile
            v-for="product in data.products"
            :key="product.node.id"
            :product="product.node"
            class="list-item"
          />
        </ul>
      </template>
    </product-list-container>
  </div>
</template>

<script>
import ProductTile from '~/components/Shop/ProductTile.vue'
import ProductListContainer from '~/components/Shop/ProductList/ProductListContainer.vue'

export default {
  components: {
    ProductTile,
    ProductListContainer,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    category: {
      type: Number,
      default: 0,
    },
  },
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
