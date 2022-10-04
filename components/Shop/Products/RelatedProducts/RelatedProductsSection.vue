<template>
  <section
    v-if="products.length"
    aria-labelledby="featured-products"
    :class="$style['featured-products']"
  >
    <center-wrapper>
      <h1 id="featured-products">
        <template v-if="relatedProducts.title">
          {{ relatedProducts.title }}
        </template>
        <template v-else>
          {{ $t('title') }}
        </template>
      </h1>
      <product-list :products="products" />
      <app-button :to="localePath({ name: 'shop' })">
        {{ $t('btn') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { IRelatedProducts } from '~/interfaces/IProduct'

export default defineComponent({
  props: {
    relatedProducts: {
      type: Object as PropType<IRelatedProducts>,
      default: () => {},
    },
  },
  setup(props) {
    const products = computed(() => {
      if (!props.relatedProducts.products) {
        return []
      }
      return props.relatedProducts.products.map((product) => {
        return {
          ...product.product,
        }
      })
    })

    return {
      products,
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
