<template>
  <section
    v-if="products.length"
    aria-labelledby="featured-products"
    :class="$style['featured-products']"
  >
    <center-wrapper>
      <h1 id="featured-products">{{ title }}</h1>
      <product-list :products="products" />
      <app-button :to="localePath({ name: 'shop' })">
        {{ $t('btn') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    relatedProducts: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root }) {
    const title = computed(() => {
      // @ts-ignore
      return props.relatedProducts.title || root.$t('title')
    })

    const products = computed(() => {
      if (!props.relatedProducts.products) {
        return []
      }
      // @ts-ignore
      return props.relatedProducts.products.map((product) => {
        return {
          ...product.product,
        }
      })
    })

    return {
      products,
      title,
    }
  },
})
</script>

<style lang="postcss" module>
.featured-products {
  padding: 3em 0;
}
</style>

<i18n>
{
  "nl": {
    "title": "Het winkeltje",
    "btn": "Bezoek ons winkeltje"
  }
}
</i18n>
