<template>
  <div ref="balloon" class="balloon" :class="{ animate: animate }">
    <app-image
      width="159"
      height="243"
      src="/images/air-balloon.png"
      alt
      class="balloon-image"
    />
  </div>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'

export default {
  components: {
    AppImage
  },
  data() {
    return {
      animate: false
    }
  },
  mounted() {
    const { balloon } = this.$refs
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
      imageObserver.observe(balloon)
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
  @media (--viewport-lg) {
    position: absolute;
  }
  bottom: 4rem;
  right: 4rem;
  &.animate {
    animation: balloonX 20s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
    @media (--viewport-lg) {
      animation-name: balloonXLarge;
    }
  }
}

.balloon-image {
  @nest .balloon.animate & {
    animation: balloonY 20s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
    @media (--viewport-lg) {
      animation-name: balloonYLarge;
    }
  }
}

@keyframes balloonY {
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateX(5rem);
  }
}

@keyframes balloonX {
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateY(2rem);
  }
}

@keyframes balloonYLarge {
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateY(-8rem);
  }
}

@keyframes balloonXLarge {
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);

    transform: translateX(-2rem);
  }
}
</style>
