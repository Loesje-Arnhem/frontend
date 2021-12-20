<template>
  <div>
    <div :class="$style.wrapper">
      <div class="tile">
        <ul ref="list" :class="$style.list">
          <slot />
        </ul>
      </div>
      <carousel-prev-next-buttons />
    </div>
    <carousel-thumbs :thumbs="thumbs" />
  </div>
</template>

<script>
import {
  ref,
  watch,
  onMounted,
  onUnmounted,
  provide,
} from '@nuxtjs/composition-api'
import smoothscroll from 'smoothscroll-polyfill'
import CarouselThumbs from './CarouselThumbs.vue'
import useCarousel from '~/composables/carousel'
export default {
  components: { CarouselThumbs },
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    thumbs: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { root }) {
    const list = ref(null)

    const activeSlide = ref(0)
    const shouldAnimate = ref(false)

    provide('carousel', {
      activeSlide,
      shouldAnimate,
      totalPages: props.totalPages,
    })

    const { navigateByKeyboard } = useCarousel()

    const getActiveSlidePosition = () => {
      if (!list.value) {
        return 0
      }

      const listItem = list.value.querySelector(
        `li:nth-child(${activeSlide.value + 1})`,
      )

      if (!listItem) {
        return 0
      }

      return listItem.offsetLeft
    }

    const scrollToSelectedSlide = () => {
      root.$nextTick(() => {
        if (!list.value) {
          return
        }

        list.value.scrollTo({
          top: 0,
          left: getActiveSlidePosition(),
          behavior: 'smooth',
        })
      })
    }
    let scrollTimeOut = null

    watch(activeSlide, () => {
      if (shouldAnimate.value) {
        scrollToSelectedSlide()
      }
      if (scrollTimeOut) {
        clearTimeout(scrollTimeOut)
      }
      scrollTimeOut = setTimeout(() => {
        shouldAnimate.value = false
      }, 500)
    })

    onMounted(() => {
      smoothscroll.polyfill()
      document.addEventListener('keydown', navigateByKeyboard)
      window.addEventListener('resize', scrollToSelectedSlide)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', navigateByKeyboard)
      window.removeEventListener('resize', scrollToSelectedSlide)
    })

    return {
      activeSlide,
      list,
    }
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  position: relative;
  margin-bottom: 0.5em;
}

.list {
  @mixin list-reset;

  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
