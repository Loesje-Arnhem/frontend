<script setup lang="ts">
import { GetPageByID } from '~/graphql/pages'

defineI18nRoute({
  paths: {
    nl: '/winkeltje/winkelwagen',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncQuery(GetPageByID, {
  id: pageIds.cart.toString(),
})

useMeta(data.value?.page)
</script>

<template>
  <center-wrapper v-if="data.page">
    <shop-header />
    <h1>{{ data.page.title }}</h1>
    <client-only>
      <cart-list />
    </client-only>
  </center-wrapper>
</template>
