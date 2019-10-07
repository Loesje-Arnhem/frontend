<template>
  <li class="product-tile">
    <div class="image-wrapper">
      <app-image v-if="product.image" :src="product.image.medium" />
    </div>
    <h3 class="title">
      <nuxt-link :to="product.slug">{{ product.name }}</nuxt-link>
    </h3>
    <!-- {{ product.price }}
    {{ product.salePrice }} -->
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
  padding: 0.5em;
  --rough-stroke-width: 3px;
  --rough-roughness: 1.5;
  border: var(--rough-stroke-width) solid var(--rough-stroke);
  @nest .is-loaded & {
    @supports (border-image-source: paint(rough-boxes)) {
      border-image-source: paint(rough-boxes);
      border-image-slice: 0 fill;
      border-image-outset: 0.5em;
    }
  }
}

.image-wrapper {
  height: 12em;
}

a {
  @mixin link-reset;
}

img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

h3 {
  margin-bottom: 0;
}
</style>
