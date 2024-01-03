<script setup lang="ts">
import { GetPageByID } from '~/graphql/pages'

defineI18nRoute({
  paths: {
    nl: '/winkeltje/afrekenen',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncQuery(GetPageByID, {
  id: pageIds.checkout.toString(),
})

useMeta(data.value?.page)
</script>

<template>
  <center-wrapper>
    <h1 v-if="data">{{ data.page.title }}</h1>
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
