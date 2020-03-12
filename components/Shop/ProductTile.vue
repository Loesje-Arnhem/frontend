<template>
  <clickable-list-item :url="url" class="product-tile">
    <div class="image-wrapper">
      <app-image v-if="product.image" :src="product.image.medium" />
    </div>
    <h3 class="title">
      <nuxt-link :to="url">{{ product.name }}</nuxt-link>
    </h3>
    <div v-if="product.price" class="price">
      {{ product.price }}
    </div>
  </clickable-list-item>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'
import ClickableListItem from '@/components/Shared/ClickableListItem.vue'

export default {
  components: {
    AppImage,
    ClickableListItem,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    url() {
      return `/winkeltje/${this.product.slug}`
    },
  },
}
</script>

<style scoped lang="postcss">
.product-tile {
  @mixin tile-border;
  padding: 0.5em;
  display: grid;
  grid-template-rows: subgrid;
  grid-template-rows: 12em auto 1.5em;
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

.price {
}
</style>
