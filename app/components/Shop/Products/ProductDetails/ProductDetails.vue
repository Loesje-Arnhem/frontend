<script lang="ts" setup>
import type { IProduct } from '~/types/Content'

defineProps<{
  product: IProduct
}>()
</script>

<template>
  <div>
    <div class="product-wrapper">
      <div class="product-details">
        <product-gallery :images="product.images" />
        <div class="content">
          <h1 v-html="product.title" />
          <div v-html="product.excerpt" />
          <form-add-to-cart :product="product" />
        </div>
      </div>
      <h2>Beschrijving</h2>
      <div
        class="description"
        v-html="product.description"
      />
    </div>
  </div>
</template>

<style scoped>
.product-wrapper {
  margin-bottom: 3em;
}

.product-details {
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(16em, 1fr));
  align-items: start;
}
</style>
