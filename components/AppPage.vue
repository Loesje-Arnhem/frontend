<template>
  <div>
    <h1 v-html="title" />
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
