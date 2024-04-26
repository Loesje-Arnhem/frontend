<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncData(`page-shop`, () =>
  $fetch('/api/pages/page', {
    params: {
      id: pageIds.shop,
    },
  }),
)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

useMeta({
  title: data.value.title,
  description: data.value.description,
})
</script>

<template>
  <shop-wrapper v-if="data">
    <div v-if="data">
      <h1>{{ data.title }}</h1>
      <p v-if="data.content" v-html="data.content" />
    </div>
    <product-list :featured="true" />
  </shop-wrapper>
</template>
