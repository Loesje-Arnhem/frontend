<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src: string
    width: number
    height: number
    sizes: string
    lazy?: boolean
    alt?: string
  }>(),
  {
    alt: '',
    lazy: true,
  },
)
const loading = computed(() => {
  if (props.lazy) {
    return 'lazy'
  }
  return null
})
</script>

<template>
  <img
    :alt="alt"
    :loading="loading"
    :src="src"
    :preload="!lazy"
    :sizes="sizes"
    :width="width"
    :height="height"
    preset="base"
    class="image"
    format="avif"
  >
</template>

<style lang="postcss" scoped>
.image :deep(img) {
  display: block;
  max-width: 100%;
}
</style>
