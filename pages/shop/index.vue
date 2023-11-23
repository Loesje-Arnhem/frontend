<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncGql('GetPageByID', {
  id: pageIds.shop.toString(),
})

useMeta(data.value?.page)
</script>

<template>
  <shop-wrapper>
    <div v-if="data.page">
      <h1>{{ data.page.title }}</h1>
      <p v-if="data.page.content" v-html="data.page.content" />
    </div>
    <product-list :featured="true" />
  </shop-wrapper>
</template>
