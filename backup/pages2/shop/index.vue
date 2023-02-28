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

<script lang="ts">
import { computed, defineComponent, ComputedRef } from '@nuxtjs/composition-api'
import { IPage } from '~/interfaces/IPage'
import useFetch from '~/composables/useFetch'
import { GetPageShop } from '~/graphql/Pages/Pages'
import useMeta from '~/composables/useMeta'
import { IProducts } from '~/interfaces/IProduct'

export default defineComponent({
  setup() {
    const { result, loading } = useFetch({
      query: GetPageShop,
      pageKey: 'page-shop',
    })

    const page: ComputedRef<IPage | null> = computed(() => result.value?.page)
    const products: ComputedRef<IProducts | null> = computed(
      () => result.value?.products,
    )
    useMeta(page)

    return {
      products,
      page,
      loading,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/',
    },
  },
  head: {},
})
</script>
