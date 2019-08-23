<template>
  <div class="balloon" :class="{ animate: animate }">
    <img ref="image" src="/images/air-balloon.png" alt class="balloon-image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      animate: false
    }
  },
  mounted() {
    const { image } = this.$refs
    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window
    ) {
      const imageObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            this.toggleAnimation(entry.isIntersecting)
          })
        },
        {
          rootMargin: '200px 0px'
        }
      )
      imageObserver.observe(image)
    } else {
      this.toggleAnimation(true)
    }
  },
  methods: {
    toggleAnimation(animate) {
      this.animate = animate
    }
  }
}
</script>

<style lang="postcss" scoped>
.balloon {
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  &.animate {
    animation: balloonX 20s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
  }
}

.balloon-image {
  @nest .balloon.animate & {
    animation: balloonY 20s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
  }
}

@keyframes balloonY {
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(-8rem);
  }
}

@keyframes balloonX {
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(-2rem);
  }
}
</style>
