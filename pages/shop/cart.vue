<template>
  <center-wrapper>
    <shop-header />
    <h1>{{ page.title }}</h1>
    <client-only>
      <cart-list />
    </client-only>
    <app-button :to="localePath({ name: 'shop-checkout' })">
      Doorgaan met afrekenen
    </app-button>
  </center-wrapper>
</template>

<script>
import { cartPageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import getSeoMetaData from '~/utils/seo'

export default {
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider
    const page = await defaultClient.query({
      query: PageByIdQuery,
      variables: {
        id: cartPageId,
      },
    })

    return {
      page: page.data.page,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/winkelwagen',
    },
  },
  head() {
    return getSeoMetaData(this.page.seo)
  },
}
</script>
