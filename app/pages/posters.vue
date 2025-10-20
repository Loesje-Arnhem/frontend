<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/posters',
  },
})
definePageMeta({
  key: route => route.fullPath,
})

useMeta({
  title: 'Posters',
})
</script>

<template>
  <div>
    <poster-navigation />
    <nuxt-page />
  </div>
</template>
