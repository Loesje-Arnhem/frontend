<script lang="ts" setup>
import type { IProductListItem } from '~/types/Content'

const props = defineProps<{
  product: IProductListItem
}>()

const localePath = useLocalePath()

// const url = localePath({
//   name: 'shop-product',
//   params: {
//     slug: props.product.slug,
//   },
// })
const url = props.product.url
</script>

<template>
  <clickable-list-item
    :to="url"
    :external="true"
    class="product-tile tile"
  >
    <div class="image-wrapper">
      <app-image
        v-if="product.image"
        sizes="50vw md:33vw lg:25vw xl:300px"
        v-bind="product.image"
        class="image"
      />
    </div>
    <div class="title">
      <router-link
        class="link"
        :to="url"
      >
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

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.product-tile {
  padding: 0 0 0.5em;
  display: grid;
  grid-row: span 3;
  gap: 0.25em;
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

  :deep(img) {
    width: 100%;
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
