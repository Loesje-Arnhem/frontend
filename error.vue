<script lang="ts" setup>
defineProps<{
  error: Error
}>()

const { t } = useI18n()

useHead({
  title: t('errors.error404'),
})
</script>

<template>
  <nuxt-layout>
    <div>
      <h1>404</h1>
      <p>{{ error.message }}</p>
    </div>
  </nuxt-layout>
</template>
