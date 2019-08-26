<template>
  <li class="product-tile">
    <h3>
      <nuxt-link :to="product.slug">{{ product.name }}</nuxt-link>
    </h3>
    <app-image v-if="product.image" :src="product.image.medium" alt />
    {{ product.price }}
    {{ product.salePrice }}
  </li>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'
export default {
  components: {
    AppImage
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="postcss">
.product-tile {
  @mixin list-reset;
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}
</style>
