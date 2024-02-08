<script lang="ts" setup>
import type { CartItem } from '~/types/Cart'

defineProps<{
  item: CartItem
}>()
</script>

<template>
  <span>
    <span v-html="item.title" />
    <ul v-if="item.variation.length" class="list">
      <li v-for="variation in item.variation" :key="variation.attribute">
        {{ variation.attribute }}:
        <span v-html="variation.value" />
      </li>
    </ul>
  </span>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
  font-size: var(--font-size-sm);
}
</style>
