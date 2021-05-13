<template>
  <div :class="$style.price">
    <template v-if="product.salePrice">
      <span :class="$style['price-old']">{{ product.regularPrice }}</span>
      {{ product.salePrice }}
    </template>
    <template v-else>{{ product.price }}</template>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style module lang="postcss">
.price-old {
  text-decoration: line-through;
}
</style>
