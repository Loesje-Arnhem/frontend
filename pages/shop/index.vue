<template>
  <shop-wrapper>
    <app-loader v-if="loading" />
    <template v-else-if="page">
      <h1>{{ page.title }}</h1>
      <p v-if="page.content" v-html="page.content" />
      <product-list :products="products" />
    </template>
  </shop-wrapper>
</template>

<script>
import { usePageShop } from '~/composables/usePage'

export default {
  setup() {
    const { page, loading, products } = usePageShop()
    return {
      page,
      loading,
      products,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/',
    },
  },
  head: {},
}
</script>
