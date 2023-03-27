<script lang="ts" setup>
import { IProductTile } from '~/interfaces/IProduct'

const props = defineProps<{
  product: IProductTile
}>()

const appConfig = useAppConfig()

const url = computed(() => {
  return `${appConfig.shopUrl}winkeltje/${props.product.slug}`
})
</script>

<template>
  <clickable-list-item
    :href="url"
    :class="$style['product-tile']"
    class="tile"
  >
    <div :class="$style['image-wrapper']">
      <featured-image
        v-if="product.featuredImage"
        :image="product.featuredImage"
        :class="$style.image"
        sizes="(max-width: 375px) 50vw, (max-width: 720px) 33vw, (max-width: 1024px) 25vw, 200px"
      />
    </div>
    <div :class="$style.title">
      <a
        :class="$style.link"
        :href="url"
        v-html="product.title"
      />
    </div>
    <product-prices
      :product="product"
      :class="$style.price"
    />
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
