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
    <product-prices :product="product" :class="$style.price" />
  </clickable-list-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedProduct } from '~/interfaces/IRelatedProducts'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<IRelatedProduct>,
      required: true,
    },
  },
  setup(props) {
    const url = computed(() => {
      return `/winkeltje/${props.product.slug}`
    })
    return {
      url,
    }
  },
})
</script>

<style module lang="postcss">
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
  display: block;
  object-fit: cover;
}

.title {
  font-family: var(--font-family-base);
  margin: 0;
  font-size: 1em;
  text-transform: none;

  @media (--viewport-xs) {
    font-family: var(--font-family-headings);
    text-transform: uppercase;
    font-size: var(--font-size-l);
  }
}
</style>
