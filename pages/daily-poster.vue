<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/dagelijkse-poster',
  },
})
</script>

<template>
  <center-wrapper size="sm">
    <client-only>
      <daily-poster
        class="daily-poster"
        sizes="default: '(max-width: 640px) 90vw, 540px',"
      />
    </client-only>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
.daily-poster {
  margin-block: 4em;
}
</style>
