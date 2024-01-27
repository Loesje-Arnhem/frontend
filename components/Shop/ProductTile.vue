<script lang="ts" setup>
import type { IProductListItem } from '~/types/Content'

const props = defineProps<{
  product: IProductListItem
}>()

const localePath = useLocalePath()

const url = localePath({
  name: 'shop-product',
  params: {
    slug: props.product.slug,
  },
})
</script>

<template>
  <clickable-list-item :to="url" :class="$style['product-tile']" class="tile">
    <div :class="$style['image-wrapper']">
      <img v-if="product.image" :src="product.image.src" />
    </div>
    <div :class="$style.title">
      <router-link :class="$style.link" :to="url">
        <span v-html="product.title" />
      </router-link>
    </div>
    <product-prices :product="product" :class="$style.price" />
  </clickable-list-item>
</template>

<style module lang="postcss">
@import '~/assets/css/media-queries/media-queries.css';

.product-tile {
  padding: 0 0 0.5em;
  display: grid;
  grid-row: span 3;
  grid-gap: 0.25em;
  grid-template-rows: 16em auto 1.5em;
  font-size: var(--font-size-xs);

  @media (--viewport-xxs) {
    font-size: var(--font-size-sm);
  }

  @media (--viewport-xs) {
    font-size: 1rem;
  }

  @supports (grid-template-rows: subgrid) {
    grid-template-rows: subgrid;
  }
}

.link {
  @mixin link-reset;
}

.title,
.price {
  padding: 0 0.5em;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  @mixin heading;

  font-size: 1em;

  @media (--viewport-xs) {
    font-size: var(--font-size-l);
  }
}
</style>
