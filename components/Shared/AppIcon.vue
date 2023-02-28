<script lang="ts" setup>
withDefaults(
  defineProps<{
    icon: string
    title?: string
    width?: number
    height?: number
  }>(),
  {
    width: 24,
    height: 24,
  },
)
</script>

<template>
  <div
    :name="icon"
    class="icon"
    :width="width"
    :height="height"
    aria-hidden="true"
    :title="title"
  />
</template>

<style scoped lang="postcss">
.icon {
  display: inline-block;
  fill: currentcolor;
  position: relative;
}
</style>
