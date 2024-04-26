<script lang="ts" setup>
import type { IProductListItem } from '~/types/Content'

defineProps<{
  price: number
  regularPrice?: number
}>()
</script>

<template>
  <div class="price">
    <span v-if="regularPrice" class="price-old">
      {{ $n(regularPrice, 'currency') }}
    </span>
    {{ $n(price, 'currency') }}
  </div>
</template>

<style lang="postcss" scoped>
.price-old {
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  text-decoration: line-through;
}
</style>
