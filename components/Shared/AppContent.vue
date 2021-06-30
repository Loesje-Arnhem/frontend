<template>
    <article :class="$style.wrapper">
      <h1>{{ title }}</h1>
      <post-date v-if="date" :date="date" :class="$style.date" />
      <div class="text" v-html="content" />
    </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
