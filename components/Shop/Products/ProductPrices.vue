<script lang="ts" setup>
import type { IProductListItem } from '~/types/Content'

defineProps<{
  product: IProductListItem
}>()
</script>

<template>
  <div v-if="product.price" class="price">
    <span v-if="product.regularPrice" class="price-old">
      {{ $n(product.regularPrice, 'currency') }}
    </span>
    {{ $n(product.price, 'currency') }}
  </div>
</template>

<style lang="postcss" scoped>
.price-old {
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  text-decoration: line-through;
}
</style>
