<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/posters',
  },
})
</script>

<template>
  <div>
    <poster-navigation />
    <nuxt-page :key="$route.fullPath" />
  </div>
</template>
