<template>
  <shop-wrapper>
    <app-loader v-if="loading" />
    <product-details v-if="product" :product="product" />
  </shop-wrapper>
</template>

<script>
import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'
import useFetch from '~/composables/useFetch'
import ProductQuery from '~/graphql/Products/Product'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { slug } = route.value.params

    const params = computed(() => slug)

    const { result, loading } = useFetch({
      query: ProductQuery,
      variables: {
        slug,
      },
      params,
      pageKey: 'product',
    })
    const product = computed(() => result.value?.product)

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
