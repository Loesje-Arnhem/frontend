<template>
  <shop-wrapper>
    <app-loader v-if="loading" />
    <product-details v-if="product" :product="product" />
  </shop-wrapper>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  useRoute,
} from '@nuxtjs/composition-api'
import useFetch from '~/composables/useFetch'
import ProductQuery from '~/graphql/Products/Product'
import useMeta from '~/composables/useMeta'
import { IProduct } from '~/interfaces/IProduct'

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
    const product: ComputedRef<IProduct | null> = computed(() => {
      return result.value?.product
    })
    useMeta(product)

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
