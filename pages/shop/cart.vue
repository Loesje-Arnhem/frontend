<template>
  <center-wrapper>
    <shop-header />
    <h1>{{ page.title }}</h1>
    {{ testa }}
    <client-only>
      <cart-list />
    </client-only>
    <app-button :to="localePath({ name: 'shop-checkout' })">
      Doorgaan met afrekenen
    </app-button>
  </center-wrapper>
</template>

<script>
import { onMounted, useContext, ref } from '@nuxtjs/composition-api'
import { provideApolloClient } from '@vue/apollo-composable/dist'
import jwtDecode from 'jwt-decode'
import { cartPageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import getSeoMetaData from '~/utils/seo'

export default {
  setup() {
    const { app } = useContext()
    const testa = ref(null)
    provideApolloClient(app.apolloProvider?.defaultClient)
    onMounted(() => {
      const jwtSession = window.localStorage.getItem('woo-session')

      if (!jwtSession) return null

      try {
        const decoded = jwtDecode(jwtSession)

        testa.value = decoded.data
      } catch (err) {
        console.warn(err)
      }
    })
    return {
      testa,
    }
  },
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
