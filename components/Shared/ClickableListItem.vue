<template>
  <li @mousedown="mouseDown" @mouseup="mouseUp">
    <slot />
  </li>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      down: null
    }
  },
  methods: {
    mouseUp() {
      const up = +new Date()
      if (up - this.down < 200) {
        this.goToPost()
      }
    },
    mouseDown() {
      this.down = +new Date()
    },
    goToPost() {
      this.$router.push(this.url)
    }
  }
}
</script>

<style lang="postcss" scoped>
.list-item {
  cursor: pointer;
}
</style>
