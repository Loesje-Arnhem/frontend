<script lang="ts" setup>
import type { NuxtError } from 'nuxt/app'

defineProps<{
  error: NuxtError
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
