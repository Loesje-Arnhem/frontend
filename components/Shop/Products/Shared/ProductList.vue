<template>
  <ul v-if="products.edges.length" class="list">
    <product-tile
      v-for="product in products.edges"
      :key="product.node.id"
      :product="product.node"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IProducts } from '~/interfaces/IProduct'

export default defineComponent({
  props: {
    products: {
      type: Object as PropType<IProducts>,
      default: () => {},
    },
  },
})
</script>

<style scoped lang="postcss">
.list {
  @mixin list-reset;

  margin: 0 0 1em;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);

  @media (--viewport-sm) {
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
}
</style>
