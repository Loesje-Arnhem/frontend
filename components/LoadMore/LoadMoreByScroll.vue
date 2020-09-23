<template>
  <infinite-loading
    ref="infiniteLoading"
    placeholder="Loading..."
    :identifier="infiniteId"
    @infinite="$emit('load-more')"
  >
    <span slot="no-more" />
    <span slot="spinner" />
  </infinite-loading>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {
    InfiniteLoading,
  },
  props: {
    state: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      infiniteId: +new Date(),
    }
  },
  watch: {
    state() {
      const { stateChanger } = this.$refs.infiniteLoading
      if (this.state === 'loaded') {
        stateChanger.loaded()
      }
      if (this.state === 'complete') {
        stateChanger.complete()
      }
    },
  },
}
</script>
