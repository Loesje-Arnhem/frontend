<template>
  <nuxt-link :to="uri" :class="$style.link" @click.native="changePage">
    <span :class="$style.title" class="title" v-html="title" />
  </nuxt-link>
</template>

<script>
import EventBusUtil from '~/utils/eventBusUtil'

export default {
  props: {
    uri: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    changePage() {
      EventBusUtil.$emit('change-page')
    },
  },
}
</script>

<style lang="postcss" module>
.link {
  @mixin hover-with-title;
}
</style>
