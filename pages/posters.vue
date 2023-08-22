<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/posters',
  },
})
definePageMeta({
  key: (route) => route.fullPath,
})
</script>

<template>
  <div>
    <poster-navigation />
    <nuxt-page />
  </div>
</template>
