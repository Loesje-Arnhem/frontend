<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    categoryId?: number
    featured?: boolean
    productIds?: number[]
  }>(),
  {
    featured: undefined,
    categoryId: undefined,
    productIds: () => [],
  },
)

const { data } = useFetch('/api/products/products', {
  query: {
    productIds: props.productIds.join(','),
    featured: props.featured,
    categoryId: props.categoryId,
  },
})
</script>

<template>
  <ul
    v-if="data?.length"
    class="list"
  >
    <product-tile
      v-for="product in data"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.list {
  @mixin list-reset;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin: 0 0 1em;

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
    gap: 1rem;
  }
}
</style>
