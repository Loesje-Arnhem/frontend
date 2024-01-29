<script lang="ts" setup>
import type { NuxtError } from 'nuxt/app'

defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()

const handleError = () => clearError({ redirect: '/' })
useHead({
  title: t('errors.error404'),
})
</script>

<template>
  <nuxt-layout>
    <center-wrapper>
      <h1>404</h1>
      <p>{{ error.message }}</p>
      <button @click="handleError">Clear errors</button>
    </center-wrapper>
  </nuxt-layout>
</template>
