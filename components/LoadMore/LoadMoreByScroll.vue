<template>
  <infinite-loading ref="infiniteLoading" @infinite="loadMore">
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
      if (!value) {
        this.$nextTick(() => {
          this.updateState('loaded')
        })
      }
    },
    hasMore(value) {
      if (!value) {
        this.updateState('complete')
      }
    },
  },
  methods: {
    loadMore() {
      this.$nextTick(() => {
        this.$emit('load-more')
      })
    },
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
