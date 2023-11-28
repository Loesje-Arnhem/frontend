<script lang="ts" setup>
import { GetProducts } from '~/graphql2/products'

const props = withDefaults(
  defineProps<{
    categoryId?: number
    featured?: boolean
    productIds?: number[]
  }>(),
  {
    featured: false,
    categoryId: 0,
    productIds: () => [],
  },
)

const { data } = await useAsyncQuery(GetProducts, {
  categoryId: props.categoryId,
  featured: props.featured,
  include: props.productIds,
})
</script>

<template>
  <ul v-if="data.products?.edges.length" class="list">
    <product-tile
      v-for="product in data.products.edges"
      :key="product.node.id"
      :product="product.node"
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
