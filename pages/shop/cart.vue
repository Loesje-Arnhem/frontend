<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje/winkelwagen',
  },
})

const { pageIds } = useAppConfig()
const localePath = useLocalePath()

const { data } = await useAsyncGql('GetPageByID', {
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
    <app-button :to="localePath({ name: 'shop-checkout' })">
      Doorgaan met afrekenen
    </app-button>
  </center-wrapper>
</template>
