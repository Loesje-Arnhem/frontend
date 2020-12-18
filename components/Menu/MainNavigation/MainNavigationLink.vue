<template>
  <nuxt-link :to="uri" :class="$style.link" @click.native="changePage">
    <span v-if="title" :class="$style.title" class="title" v-html="title" />
    <span v-else :class="$style.title" class="title">title</span>
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
