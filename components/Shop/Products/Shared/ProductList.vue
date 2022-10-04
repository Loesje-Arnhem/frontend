<template>
  <ul v-if="products.length" :class="$style.list">
    <product-tile
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedProduct } from '~/interfaces/IProduct'

export default defineComponent({
  props: {
    products: {
      type: Array as PropType<IRelatedProduct[]>,
      default: () => [],
    },
  },
})
</script>

<style module lang="postcss">
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
