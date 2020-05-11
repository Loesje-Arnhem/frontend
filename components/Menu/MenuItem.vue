<template>
  <nuxt-link :to="item.uri">{{ item.label }}</nuxt-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
