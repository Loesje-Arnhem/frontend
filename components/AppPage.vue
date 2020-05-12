<template>
  <div>
    <!-- eslint-disable vue/no-v-html -->
    <h1 v-html="title" />
    <!-- eslint-enable vue/no-v-html -->
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
