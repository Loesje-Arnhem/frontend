<template>
  <div ref="balloon" class="balloon" :class="{ animate }">
    <app-image
      class="image"
      :width="159"
      :height="243"
      src="/images/air-balloon.png"
      sizes="xs:159px sm:358px"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      animate: false,
      imageObserver: null,
      balloon: null,
    }
  },
  mounted() {
    this.balloon = this.$refs.balloon
    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window
    ) {
      this.imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.toggleAnimation(entry.isIntersecting)
          })
        },
        {
          rootMargin: '200px 0px',
        },
      )
      this.imageObserver.observe(this.balloon)
    } else {
      this.toggleAnimation(true)
    }
  },
  destroyed() {
    this.imageObserver.unobserve(this.balloon)
  },
  methods: {
    toggleAnimation(animate) {
      this.animate = animate
    },
  },
})
</script>

<style lang="postcss" scoped>
.balloon {
  &.animate {
    animation: balloon-x 20s infinite cubic-bezier(0.02, 0.01, 0.21, 1);

    @media (--viewport-md) {
      animation-name: balloon-x-large;
    }
  }
}

.image {
  @nest .balloon.animate & {
    animation: balloon-y 20s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);

    @media (--viewport-md) {
      animation-name: balloon-y-large;
    }
  }
}

@keyframes balloon-y {
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateX(5rem);
  }
}

@keyframes balloon-x {
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateY(2rem);
  }
}

@keyframes balloon-y-large {
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateY(-8rem);
  }
}

@keyframes balloon-x-large {
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateX(-2rem);
  }
}
</style>
