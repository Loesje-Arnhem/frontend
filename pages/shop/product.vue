<template>
  <shop-wrapper>
    <app-loader v-if="loading" />
    <product-details v-if="product" :product="product" />
  </shop-wrapper>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useProduct } from '~/composables/useProduct'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { product, loading } = useProduct(route.value.params.slug)

    return {
      product,
      loading,
    }
  },

  nuxtI18n: {
    paths: {
      nl: '/winkeltje/:slug',
    },
  },
  head: {},
})
</script>
