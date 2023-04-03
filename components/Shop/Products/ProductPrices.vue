<script lang="ts" setup>
import { IProductListItem } from '~/interfaces/IContent'

 defineProps<{
  product: IProductListItem
}>()
</script>


<template>
  <div
    v-if="product.price"
    :class="$style.price"
  >
    <template v-if="product.regularPrice">
      <span :class="$style['price-old']">{{ $n(product.regularPrice, 'currency') }}</span>
      <!-- {{ $n(product.salePrice, 'currency') }} -->
    </template>
    <template v-else>
      {{ $n(product.price, 'currency') }}
    </template>
  </div>
</template>

<style module lang="postcss">
.price-old {
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  text-decoration: line-through;
}
</style>
