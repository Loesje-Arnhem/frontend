<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/offline',
  },
})

useMeta({
  title: 'Je bent offline',
  description: 'Je bent offline',
})
</script>

<template>
  <app-content
    title="Je bent offline"
  />
</template>
