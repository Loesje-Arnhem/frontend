<template>
  <shop-wrapper>
    <app-loader v-if="loading" />
    <template v-if="page">
      <h1>{{ page.title }}</h1>
      <p v-if="page.content" v-html="page.content" />
    </template>
    <product-list :where="{ featured: true }" />
  </shop-wrapper>
</template>

<script>
import { shopPageId } from '~/data/pages'
import { usePageById } from '~/composables/usePage'

export default {
  setup() {
    const { page, loading } = usePageById(shopPageId)
    return {
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
}
</script>
