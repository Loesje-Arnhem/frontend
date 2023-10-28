<script lang="ts" setup>
import {
  type PageRelatedProductNodeFragment,
  type PostRelatedProductNodeFragment,
} from '#gql'

defineProps<{
  products: PageRelatedProductNodeFragment[] | PostRelatedProductNodeFragment[]
}>()
</script>

<template>
  <ul
    v-if="products.length"
    class="list"
  >
    <product-tile
      v-for="product in products"
      :key="product.product?.id"
      :product="product.product"
    />
  </ul>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

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
