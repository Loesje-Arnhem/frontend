<template>
  <transition :name="animation">
    <slot />
  </transition>
</template>

<script>
export default {
  data() {
    return {
      animation: 'slide',
    }
  },

  watch: {
    // watch the `$route` to determine the transition to use
    $route() {
      // only animate by app navigation
      if (this.popStateDetected) {
        this.animation = 'none'
      } else {
        this.animation = 'slide'
      }
      this.popStateDetected = false
    },
  },
  mounted() {
    // detect if user is using a back/forward button from the browser
    window.addEventListener('popstate', this.setPopState)
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.setPopState)
  },
  methods: {
    setPopState() {
      this.popStateDetected = true
    },
  },
}
</script>

<style lang="postcss">
.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-enter {
  opacity: 0;
  transform: translateY(-0.5em);
}
</style>
