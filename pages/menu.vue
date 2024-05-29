<script lang="ts" setup>
const { data } = await useAsyncData('menaau', () => $fetch('/api/menu'))
</script>

<template>
  <div>data={{ data }}</div>
</template>
