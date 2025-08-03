<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src: string;
    width?: number;
    height?: number;
    sizes?: string;
    lazy?: boolean;
    alt?: string;
  }>(),
  {
    width: undefined,
    height: undefined,
    sizes: undefined,
    alt: "",
    lazy: true,
  },
);
const loading = computed(() => {
  if (props.lazy) {
    return "lazy";
  }
  return "eager";
});
</script>

<template>
  <nuxt-picture
    :sizes="sizes"
    :alt="alt ? alt : ''"
    :loading="loading"
    :src="src"
    :preload="loading === 'eager'"
    :width="width"
    :height="height"
    class="image"
    format="avif,webp"
  />
</template>

<style scoped>
.image :deep(img) {
  display: block;
  max-width: 100%;
}
</style>
