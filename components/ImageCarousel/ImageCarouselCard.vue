<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

defineProps<{
  image: FeaturedImage
}>()

const $emits = defineEmits(['is-active'])

const item: Ref<HTMLLIElement | null> = ref(null)
const threshold = 1
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!import.meta.client) {
    return
  }
  if (!item.value) {
    return
  }
  observer = new IntersectionObserver(
    (entry) => {
      const isActive = entry[0].intersectionRatio > threshold
      if (isActive) {
        $emits('is-active')
      }
    },
    {
      threshold,
    },
  )
  observer.observe(item.value)
})
onUnmounted(() => {
  if (observer && item.value) {
    observer.unobserve(item.value)
  }
})
</script>

<template>
  <li
    ref="item"
    class="list-item"
  >
    <featured-image
      :image="image"
      class="image"
      sizes="(max-width: 560px) 100vw, (max-width: 560px) 50vw, (max-width: 1024px) 33vw, 460px"
    />
  </li>
</template>

<style lang="postcss" scoped>
.list-item {
  scroll-snap-align: center;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: 100%;
}
</style>
