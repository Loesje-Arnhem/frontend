<template>
  <div ref="balloon" class="balloon-x" :class="{ animate }">
    <div class="balloon-y" :class="{ animate }">
      <app-image
        :width="159"
        :height="243"
        src="/images/air-balloon.png"
        sizes="xs:159px sm:358px"
      />
    </div>
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
.animate {
  animation: 20s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
}

.balloon-x {
  margin-bottom: 2em;

  @media (--viewport-md) {
    margin-block: 6em 0;
  }

  &.animate {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    animation-name: balloon-x;

    @media (--viewport-md) {
      animation-name: balloon-x-large;
    }
  }
}

.balloon-y {
  &.animate {
    animation-name: balloon-y;

    @media (--viewport-md) {
      animation-name: balloon-y-large;
    }
  }
}

@keyframes balloon-y {
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateX(8rem);
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
