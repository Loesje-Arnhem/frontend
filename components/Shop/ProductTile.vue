<template>
  <clickable-list-item :url="url" :class="$style['product-tile']" class="tile">
    <div :class="$style['image-wrapper']">
      <app-image
        v-if="product.image"
        :src="product.image.medium"
        :class="$style.image"
      />
    </div>
    <h3 :class="$style.title">
      <nuxt-link :class="$style.link" :to="url" v-html="product.name" />
    </h3>
    <div :class="$style.price">
      <template v-if="product.price">{{ product.price }}</template>
    </div>
  </clickable-list-item>
</template>

<script>
import AppImage from '~/components/Shared/AppImage.vue'
import ClickableListItem from '~/components/Shared/ClickableListItem.vue'

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

<style module lang="postcss">
.product-tile {
  padding: 0 0 0.5em;
  display: grid;
  grid-row: span 3;
  grid-gap: 0.25em;
  grid-template-rows: 16em auto 1.5em;

  @supports (grid-template-rows: subgrid) {
    grid-template-rows: subgrid;
  }
}

.link {
  @mixin link-reset;
}

@supports (grid-template-rows: subgrid) {
  .title,
  .price {
    padding: 0 0.5em;
  }
}

.image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.title {
  margin: 0;
}
</style>
