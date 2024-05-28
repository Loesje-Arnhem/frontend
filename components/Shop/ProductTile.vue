<script lang="ts" setup>
import type { IProductListItem } from "~/types/Content";

const config = useRuntimeConfig();

const props = defineProps<{
  product: IProductListItem;
}>();

const localePath = useLocalePath();

const url = computed(() => {
  if (config.public.includeShop) {
    return localePath({
      name: "shop-product",
      params: {
        slug: props.product.slug,
      },
    });
  }
  return props.product.url;
});
</script>

<template>
  <clickable-list-item
    :to="url"
    :external="!config.public.includeShop"
    class="product-tile tile"
  >
    <div class="image-wrapper">
      <featured-image
        v-if="product.image"
        sizes="50vw xs:33vw md:25vw lg:300px"
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
@import "~/assets/css/media-queries/media-queries.css";

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
