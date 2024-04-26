<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/winkeltje/afrekenen',
  },
})

definePageMeta({
  middleware: ['cart'],
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncData(`page-home`, () =>
  $fetch('/api/pages/page', {
    params: {
      id: pageIds.checkout,
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
  <center-wrapper>
    <h1 v-if="data">{{ data.title }}</h1>
    <div class="checkout">
      <form-checkout />
      <mini-cart />
    </div>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.checkout {
  display: grid;
  grid-gap: 1em;

  @media (--viewport-lg) {
    grid-template-columns: 2fr 1fr;
  }
}
</style>
