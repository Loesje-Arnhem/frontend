<template>
  <nuxt-link :to="uri" :class="$style.link" @click.native="changePage">
    <!-- eslint-disable vue/no-v-html -->
    <span :class="$style.title" class="title" v-html="title" />
    <!-- eslint-enable vue/no-v-html -->
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
.title {
  transition: box-shadow 0.2s ease-out;

  @nest .link:hover & {
    box-shadow: 0 2px 0 0 currentColor;
  }

  @nest .link:hover & {
    box-shadow: 0 2px 0 0 currentColor;
  }
}
</style>
