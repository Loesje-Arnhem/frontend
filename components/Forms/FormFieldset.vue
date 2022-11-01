<template>
  <fieldset>
    <legend>{{ title }}</legend>
    <div class="fields">
      <slot />
    </div>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="postcss" scoped>
.fields {
  display: grid;
  grid-gap: var(--gutter);
  margin-bottom: 1.5em;
}
</style>
