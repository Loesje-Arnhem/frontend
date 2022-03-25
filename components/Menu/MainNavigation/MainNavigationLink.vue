<template>
  <nuxt-link :to="uri" :class="$style.link" @click.native="clear">
    <span :class="$style.title" class="title" v-html="title" />
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useLayout from '~/composables/useLayout'

export default defineComponent({
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
  setup() {
    const { clear } = useLayout()
    return {
      clear,
    }
  },
})
</script>

<style lang="postcss" module>
.link {
  @mixin hover-with-title;
}
</style>
