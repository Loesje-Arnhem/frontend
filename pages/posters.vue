<template>
  <div>
    <poster-navigation />
    <nuxt-child :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  key(route) {
    return route.fullPath
  },
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
})
</script>
