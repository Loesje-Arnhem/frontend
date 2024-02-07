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
  <clickable-list-item :to="url" class="product-tile tile">
    <div class="image-wrapper">
      <featured-image
        v-if="product.image"
        sizes="(max-width: 375px) 50vw, (max-width: 720px) 33vw, (max-width: 1024px) 25vw, 200px"
        :image="product.image"
        class="image"
      />
    </div>
    <div class="title">
      <router-link class="link" :to="url">
        <span v-html="product.title" />
      </router-link>
    </div>

    <product-prices
      v-if="product.price"
      :price="product.price"
      :regular-price="product.regularPrice"
      class="price"
    />
  </clickable-list-item>
</template>

<style lang="postcss" scoped>
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
