<template>
  <div>
    <poster-navigation />
    <nuxt-child :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  key(route) {
    return route.fullPath
  },
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
}
</script>
