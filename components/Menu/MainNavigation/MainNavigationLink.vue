<template>
  <nuxt-link :to="uri" class="link" @click="clear">
    <span :class="$style.title" class="title" v-html="title" />
  </nuxt-link>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    uri: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
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

<style lang="postcss" scoped>
.link {
  @mixin hover-with-title;
}
</style>
