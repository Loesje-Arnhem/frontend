<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/dagelijkse-poster',
  },
})
</script>

<template>
  <center-wrapper size="sm">
    <daily-poster
      class="daily-poster"
      sizes="90vw sm:540px"
    />
  </center-wrapper>
</template>

<style lang="postcss" scoped>
.daily-poster {
  margin-block: 4em;
}
</style>
