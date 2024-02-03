<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

const props = defineProps<{
  images: FeaturedImage[]
}>()

const activeItemIndex = ref(0)
const list = ref<HTMLUListElement | null>(null)

const previousSlideEnabled = computed(() => {
  return activeItemIndex.value > 0
})

const nextSlideEnabled = computed(() => {
  return activeItemIndex.value < props.images.length - 1
})

const goToPreviousSlide = () => {
  if (!previousSlideEnabled.value) return
  activeItemIndex.value = activeItemIndex.value - 1
}
const goToNextSlide = () => {
  if (!nextSlideEnabled.value) return
  activeItemIndex.value = activeItemIndex.value + 1
}

const navigateByKeyboard = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    goToPreviousSlide()
  }
  if (event.key === 'ArrowRight') {
    goToNextSlide()
  }
}

const getActiveSlidePosition = () => {
  if (!list.value) {
    return 0
  }

  const listItem = list.value.querySelector(
    `li:nth-child(${activeItemIndex.value + 1})`,
  ) as HTMLLIElement | null

  if (!listItem) {
    return 0
  }

  return listItem.offsetLeft
}

watch(activeItemIndex, () => {
  scrollToSelectedSlide()
})

const scrollToSelectedSlide = () => {
  nextTick(() => {
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

onMounted(() => {
  document.addEventListener('keydown', navigateByKeyboard)
})

onUnmounted(() => {
  document.removeEventListener('keydown', navigateByKeyboard)
})
</script>

<template>
  <div>
    <div class="wrapper">
      <div class="tile">
        <ul ref="list" class="list">
          <image-carousel-card
            v-for="(image, index) in images"
            :key="image.src"
            :image="image"
            @is-active="activeItemIndex = index"
          />
        </ul>
      </div>
      <image-carousel-navigation
        :previous-slide-enabled="previousSlideEnabled"
        :next-slide-enabled="nextSlideEnabled"
        @next="goToNextSlide"
        @previous="goToPreviousSlide"
      />
    </div>
    <image-carousel-thumbs
      :images="images"
      :active-item-index="activeItemIndex"
      @update-active-card-index="(value) => (activeItemIndex = value)"
    />
  </div>
</template>

<style lang="postcss" scoped>
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
