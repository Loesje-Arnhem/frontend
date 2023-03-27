<template>
  <section aria-labelledby="featured-products">
    <h1 id="featured-products">
      Gerelateerde producten
    </h1>
    <product-list :products="products" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IProducts } from '~/interfaces/IProduct'

export default defineComponent({
  props: {
    products: {
      type: Object as PropType<IProducts[]>,
      default: () => {},
    },
  },
})
</script>
