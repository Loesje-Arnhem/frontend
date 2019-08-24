<template>
  <button v-if="type === 'submit'" type="submit" class="btn">
    <span class="title">{{ title }}</span>
  </button>
  <a v-else-if="type === 'link'" :href="to" class="btn">
    <span class="title">{{ title }}</span>
  </a>
  <nuxt-link v-else class="btn" :to="to">
    <span class="title">{{ title }}</span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.title {
  transition: box-shadow 0.2s ease-out;
  @nest .btn:hover & {
    box-shadow: 0 3px 0 0 currentColor;
  }
}
</style>
