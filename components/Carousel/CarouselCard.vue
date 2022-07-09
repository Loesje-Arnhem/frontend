<template>
  <li
    ref="item"
    class="list-item"
    :class="{ active: activeSlide === index }"
    @click="goToSlideNumber(index)"
  >
    <slot />
  </li>
</template>

<script>
import {
  ref,
  onMounted,
  onUnmounted,
  defineComponent,
} from '@nuxtjs/composition-api'
import useCarousel from '~/composables/carousel'

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { activeSlide, goToSlideNumber, shouldAnimate } = useCarousel()
    const item = ref(null)
    const threshold = 0.7
    let observer = null

    onMounted(() => {
      if (!process.client) {
        return
      }
      if (!item.value) {
        return
      }
      observer = new IntersectionObserver(
        (entry) => {
          const isActive = entry[0].intersectionRatio > threshold
          if (isActive && !shouldAnimate.value) {
            activeSlide.value = props.index
          }
        },
        {
          threshold,
        },
      )
      observer.observe(item.value)
    })
    onUnmounted(() => observer.observe(item.value))

    return {
      activeSlide,
      goToSlideNumber,
      item,
    }
  },
})
</script>

<style lang="postcss" scoped>
.list-item {
  scroll-snap-align: center;
  flex: 0 0 auto;
  width: 100%;
}
</style>
