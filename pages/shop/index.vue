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
import {
  computed,
  defineComponent,
  Ref,
  useMeta,
} from '@nuxtjs/composition-api'
import { IPage } from '~/interfaces/IPage'
import useFetch from '~/composables/useFetch'
import { GetPageShop } from '~/graphql/Pages/Pages'

export default defineComponent({
  setup() {
    const { result, loading } = useFetch({
      query: GetPageShop,
      pageKey: 'page-shop',
    })

    const page: Ref<IPage | null> = computed(() => result.value?.page)

    const products = computed(() => {
      if (!result.value) {
        return []
      }

      // @ts-ignore
      return result.value?.products.edges.map((product) => {
        return {
          ...product.node,
          featuredImage: {
            node: {
              ...product.featuredImage,
            },
          },
        }
      })
    })
    useMeta(() => ({ title: page.value?.title }))

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
})
</script>
