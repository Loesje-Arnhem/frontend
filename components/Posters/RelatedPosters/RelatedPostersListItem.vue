<script lang="ts" setup>
import type { IPosterListItem } from '~/types/Content'

defineProps<{
  poster: IPosterListItem
}>()

const transform: Ref<string | undefined> = ref(undefined)
const translate = computed(() => {
  const range = randomizeRange() / 4
  const translateX = range
  const translateY = range
  return `translate(${translateX}em, ${translateY}em)`
})
const scale = computed(() => {
  const scale = (randomizeRange() * 5 + 100) / 100
  return `scale(${scale})`
})
const rotate = computed(() => {
  const rotate = randomizeRange()
  return `rotate(${rotate}deg)`
})

const generateStyle = () => {
  transform.value = `${rotate.value} ${scale.value} ${translate.value}`
}
const randomizeRange = () => {
  return Math.floor(Math.random() * 8 - 4)
}
onMounted(() => {
  if (transform.value) {
    return
  }
  generateStyle()
})
</script>

<template>
  <li
    class="list-item"
    :style="{ transform }"
  >
    <poster-tile
      :poster="poster"
      sizes="50vw xs:33vw md:25vw lg:20vw lg:200px"
    />
  </li>
</template>

<style lang="postcss" scoped>
.list-item {
  padding: 0.5em;
  flex: 0 0 10em;
}
</style>
