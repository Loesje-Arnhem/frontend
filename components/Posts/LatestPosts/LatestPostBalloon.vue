<template>
  <div ref="balloon" :class="[$style.balloon, { [$style.animate]: animate }]">
    <app-image
      :class="$style['balloon-image']"
      width="159"
      height="243"
      :src="require('~/assets/images/air-balloon.png')"
    />
  </div>
</template>

<script>
import AppImage from '~/components/Shared/AppImage.vue'

export default {
  components: {
    AppImage,
  },
  data() {
    return {
      animate: false,
    }
  },
  mounted() {
    const { balloon } = this.$refs
    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window
    ) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.toggleAnimation(entry.isIntersecting)
          })
        },
        {
          rootMargin: '200px 0px',
        },
      )
      imageObserver.observe(balloon)
    } else {
      this.toggleAnimation(true)
    }
  },
  methods: {
    toggleAnimation(animate) {
      this.animate = animate
    },
  },
}
</script>

<style lang="postcss" module>
.balloon {
  &.animate {
    animation: balloon-x 20s infinite cubic-bezier(0.02, 0.01, 0.21, 1);

    @media (--viewport-md) {
      animation-name: balloon-x-large;
    }
  }
}

.balloon-image {
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
