<template>
  <center-wrapper>
    <shop-header />
    <h1 v-if="page">{{ page.title }}</h1>
    <client-only>
      <cart-list />
    </client-only>
    <app-button :to="localePath({ name: 'shop-checkout' })">
      Doorgaan met afrekenen
    </app-button>
  </center-wrapper>
</template>

<script>
import { usePageById } from '~/composables/usePage'
import { cartPageId } from '~/data/pages'

export default {
  setup() {
    const { page, loading } = usePageById(cartPageId)

    return {
      page,
      loading,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/winkelwagen',
    },
  },
  head: {},
}
</script>
