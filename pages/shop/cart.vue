<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje/winkelwagen',
  },
})

definePageMeta({
  middleware: ['cart'],
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncData(`page-home`, () =>
  $fetch('/api/pages/page', {
    params: {
      id: pageIds.cart,
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
})
</script>

<template>
  <center-wrapper v-if="data">
    <shop-header />
    <h1>{{ data.title }}</h1>
    <cart-list />
  </center-wrapper>
</template>
