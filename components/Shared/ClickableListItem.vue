<template>
  <li class="list-item" @mousedown="mouseDown" @mouseup="mouseUp">
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
  &:hover .read-more,
  &:focus-within .read-more {
    box-shadow: 0 3px 0 0 var(--color-black);
    & >>> .icon {
      margin-left: 0.25em;
    }
  }
}

a {
  @mixin link-reset;
}
</style>
