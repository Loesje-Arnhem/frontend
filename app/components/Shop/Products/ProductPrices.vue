<script lang="ts" setup>
defineProps<{
  price: number;
  regularPrice?: number;
}>();
</script>

<template>
  <div class="price">
    <span v-if="regularPrice" class="price-old">
      {{ $n(regularPrice, "currency") }}
    </span>
    {{ $n(price, "currency") }}
  </div>
</template>

<style scoped>
.price-old {
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  text-decoration: line-through;
}
</style>
