<script lang="ts" setup>
import { type ProductFragment } from '#gql'

defineProps<{
  product: ProductFragment
}>()
</script>

<template>
  <div v-if="product.price" class="price">
    <template v-if="product.regularPrice">
      <span class="price-old">{{ product.regularPrice }}</span>
      {{ product.salePrice }}
    </template>
    <template v-else>
      {{ product.price }}
    </template>
  </div>
</template>

<style lang="postcss" scoped>
.price-old {
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  text-decoration: line-through;
}
</style>
