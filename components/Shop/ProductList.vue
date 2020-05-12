<template>
  <div v-if="products.length" class="products">
    <ul class="list">
      <product-tile
        v-for="product in products"
        :key="product.node.id"
        :product="product.node"
        class="list-item"
      />
    </ul>
  </div>
</template>

<script>
import ProductTile from '~/components/Shop/ProductTile.vue'
export default {
  components: {
    ProductTile,
  },
  props: {
    products: {
      type: Array,
      required: true,
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
