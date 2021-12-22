<template>
  <div>
    <poster-navigation />
    <nuxt-child :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { provideApolloClient } from '@vue/apollo-composable/dist'
export default defineComponent({
  key(route) {
    return route.fullPath
  },
  setup() {
    const { app } = useContext()
    provideApolloClient(app.apolloProvider?.defaultClient)
  },
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
})
</script>
