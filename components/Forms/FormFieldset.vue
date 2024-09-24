<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend>{{ title }}</legend>
    <div class="fields">
      <slot />
    </div>
  </fieldset>
</template>

<style lang="postcss" scoped>
.fields {
  display: grid;
  grid-gap: var(--gutter);
}

.fieldset {
  margin-bottom: 1.5em;
}
</style>
