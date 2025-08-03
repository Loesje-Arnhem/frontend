<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    categoryId?: number;
    featured?: boolean;
    productIds?: number[];
  }>(),
  {
    featured: undefined,
    categoryId: undefined,
    productIds: () => [],
  },
);

const { data } = useFetch("/api/products/products", {
  query: {
    productIds: props.productIds.join(","),
    featured: props.featured,
    categoryId: props.categoryId,
  },
});
</script>

<template>
  <ul v-if="data?.length" class="list">
    <product-tile
      v-for="product in data"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<style scoped>
@import "~/assets/css/media-queries/media-queries.css";

.list {
  @mixin list-reset;

  margin: 0 0 1em;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);

  @media (--viewport-sm) {
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  }
}
</style>
