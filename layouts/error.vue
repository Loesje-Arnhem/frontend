<script setup lang="ts">
defineProps<{
  error: {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
  }
}>()
</script>

<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
  </div>
</template>
