<template>
  <infinite-loading
    ref="infiniteLoading"
    placeholder="Loading..."
    @infinite="$emit('load-more')"
  >
    <div slot="no-more" />
    <app-loader slot="spinner" />
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
    loading: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    loading(value) {
      console.log(value)
      if (value) {
        this.updateState('loading')
      } else {
        this.updateState('loaded')
      }
    },
    hasMore(value) {
      if (!value) {
        this.updateState('complete')
      }
    },
  },
  methods: {
    updateState(state) {
      const { stateChanger } = this.$refs.infiniteLoading
      if (state === 'loaded') {
        stateChanger.loaded()
      }
      if (state === 'complete') {
        stateChanger.complete()
      }
    },
  },
}
</script>
